const db = require('../util/postgres');
/**
 *
 * @param {string} game selected game
 * @returns promise with minyear and maxYear of selected game
 */
function minMax(game) {
  return db.any(`SELECT min(cast(category_b as bigint)) as minYear, max(cast(category_b as bigint)) maxYear 
  FROM "game.dbo".cards_n c
  JOIN "game.dbo".game g
    ON c.game_id = g.game_id
  where game_name = $1;`, [game]);
}

/**
 * checks if a game has a years property
 * @param {string} game
 * @returns years boolean
 */
function checkYears(game) {
  console.log('years check');
  return db.any(`
        SELECT years
        FROM "game.dbo".game g
        WHERE game_name = $1;`, [game]);
}

module.exports = {
  gameList(req, res) {
    console.log('req.cookies --->', req.cookies);
    db.query('SELECT game_name, background, font, game_icon, years FROM "game.dbo".game')
      .then((data) => {
        return res.json(data);
      })
      .catch(err => console.error(err));
  },

  gameMenu(req, res) {
    const {
      game,
    } = req.params;
    console.log('game', game);
    db.any('SELECT game_category FROM "game.dbo".game_categories where game_name =$1', [game])
      .then(async (data) => {
        res.locals.gameMenu = data;
        // eslint-disable-next-line no-return-await
        return await checkYears(game);
      })
      .then(async (years) => { console.log('years', years);
        // can do away with async wait.... later
        if (years[0].years === true) {
          // eslint-disable-next-line no-return-await
          return await minMax(game);
        }
      }).then((range) => {
        const {
          gameMenu,
        } = res.locals;
        gameMenu.push({ yearsRange: range });
        return res.send(gameMenu);
      })
      .catch(err => console.error(err));
  },
};
