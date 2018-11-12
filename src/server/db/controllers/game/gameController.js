const db = require('../util/postgres');

function minMax(game) {
  return db.any(`SELECT min(cast(category_b as bigint)) as minYear, max(cast(category_b as bigint)) maxYear 
  FROM "game.dbo".cards_n c
  JOIN "game.dbo".game g
    ON c.game_id = g.game_id
  where game_name = $1;`, [game]);
}

module.exports = {
  gameList(req, res) {
    db.query('SELECT game_name, background, font, game_icon, years FROM "game.dbo".game')
      .then((data) => {
        return res.json(data);
      })
      .catch(err => console.error(err));
  },

  gameMenu(req, res) {
    const {
      game
    } = req.params;
    console.log('params', game);
    db.any('SELECT game_category FROM "game.dbo".game_categories where game_name =$1', [game])
      .then(async (data) => { console.log('data');
        res.locals.gameMenu = data;
        // eslint-disable-next-line no-return-await
        return await minMax(game);
      }).then((years) => {
        const {
          gameMenu,
        } = res.locals;
        gameMenu.push({ yearsRange: years });
        console.log('gameMenu');
        return res.send(gameMenu);
      })
      .catch(err => console.error(err));
  },
};
