const db = require('../util/postgres');

/**
 *
 * @param {string} game selected game
 * @param {string} query selected game categories, in a wild card search
 * @returns a promise with 20 cards for games with no years property
 */
function loadGameNoYears(game, query) {
  return db.many(`
                SELECT c.*
                FROM "game.dbo".cards_n c
                  JOIN "game.dbo".game g 
                    ON g.game_id = c.game_id
                WHERE g.game_name = $1 AND ($2:raw)  
                ORDER BY RANDOM()
                LIMIT 20;`, [game, query])
    .catch(err => console.error(err));
}

/**
 *
 * @param {string} game selected game
 * @param {string} query selected categories, in a wild card search
 * @param {number} startDate game startdate, selected using slider
 * @param {number} endDate game endDate, selected using slidder
 * @returns a promise with 20 cards for a game with a years property
 */
function loadGameWithYears(game, query, startDate, endDate) {
  return db.many(`
                SELECT c.*
                FROM "game.dbo".cards_n c
                  JOIN "game.dbo".game g 
                    ON g.game_id = c.game_id
                WHERE g.game_name = $1 AND ($2:raw)  
                AND (CAST(category_b as bigint) between $3 and $4)
                ORDER BY RANDOM()
                LIMIT 20;`, [game, query, startDate, endDate])
    .catch(err => console.error(err));
}

/**
 * returns a promise for each card that is returned from loadGameWithYears/loadGameNoYears
 * @param {number} id card_id from cards table
 * @param {string} name cardname from cards table
 * @returns 3 easy answers for the selected card id. Matching is only done on the same card_category
 *  Excludes selected card_id and card_name
 */
function easyAnswers(id, name) {
  return db.many(`        
          SELECT c1.card_id, c1.card_name, 'EASY' as answer
          FROM "game.dbo".cards_n c
            JOIN "game.dbo".cards_n c1
              ON c.card_category = c1.card_category 
              AND c1.card_id <> $1
              AND c1.card_name <> $2
          WHERE c.card_id = $1
          ORDER BY RANDOM()
          LIMIT 3;
          `, [id, name])
    .catch(err => console.error(err));
}
/**
 * generates 3 medium answers for selected card
 * @param {number} id card_id from cards table
 * @param {string} name card_name from cards table
 * Excludes selected card_id and card name
 */
function mediumAnswers(id, name) {
  return db.many(`
          SELECT c1.card_id, c1.card_name, 'MEDIUM' as answer
          FROM "game.dbo".cards_n c
          JOIN "game.dbo".cards_n c1
            ON c.card_category = c1.card_category 
            AND c.category_a = c1.category_a 
            AND c1.card_id <> $1
            AND c1.card_name <> $2
          WHERE c.card_id = $1
          ORDER BY RANDOM()
          LIMIT 3;`, [id, name])
    .catch(err => console.error(err));
}
/**
 * generates 3 wrong answers for selected card
 * @param {number} id card_id from cards table
 * @param {string} name card_name from cards table
 * Excludes selected card_id and card name
 */
function hardAnswers(id, name) {
  return db.many(`
          SELECT c1.card_id, c1.card_name, 'HARD' as answer
          FROM "game.dbo".cards_n c
          JOIN "game.dbo".cards_n c1
            ON c.card_category = c1.card_category 
              AND c.category_a = c1.category_a 
              AND c.category_b = c1.category_b
              AND c1.card_id <> $1
              AND c1.card_name <> $2
          WHERE c.card_id = $1
          ORDER BY RANDOM()
          LIMIT 3;`, [id, name])
    .catch(err => console.error(err));
}
/**
 * generates 3 wrong answers for selected card with a year property
 * @param {number} id card_id from cards table
 * @param {string} name card_name from cards table
 * Excludes selected card_id and card_name
 */
function yearHardAnswers(id, name) {
  return db.many(`
          SELECT c1.card_id, c1.card_name, 'HARD' as answer
          FROM "game.dbo".cards_n c
          JOIN "game.dbo".cards_n c1
            ON c.card_category = c1.card_category 
              AND c.category_a = c1.category_a 
              AND cast(c1.category_b as bigint) between  cast(c.category_b as bigint)-3 and cast(c.category_b as bigint)+3
              AND c1.card_id <> $1
              AND c1.card_name <> $2
          WHERE c.card_id = $1 AND c.game_id = 1
          ORDER BY RANDOM()
          LIMIT 3;`, [id, name])
    .catch(err => console.error(err));
}

module.exports = {

  loadGame(req, res) {
    console.log('body', req.body);
    const {
      game,
      query,
      level,
      years,
      startDate,
      endDate,
    } = req.body;

    let prom;
    /** for games with years, generate 20 random cards with loadGameWithYears function vice-versa */

    if (years === true) {
      prom = loadGameWithYears(game, query, startDate, endDate);
    } else if (years === false) {
      prom = loadGameNoYears(game, query);
    }

    prom.then((cards) => {
      res.locals.cards = cards;

      /** runs appropriate function based on selected level for each of the randomly selected cards */
      return Promise.all(res.locals.cards.map((card) => {
        if (level === 'EASY') return easyAnswers(card.card_id, card.card_name);
        if (level === 'MEDIUM') return mediumAnswers(card.card_id, card.card_name);
        if (level === 'HARD' && years) return yearHardAnswers(card.card_id, card.card_name);
        if (level === 'HARD') return hardAnswers(card.card_id, card.card_name);
      }));
    })
      .then((result) => {
        console.log(result);
        result.forEach((set, i) => {
          res.locals.cards[i].wrongAnswers = set;
        });
        res.json(res.locals.cards);
      })
      .catch(err => console.error(err));
  },


  saveScore(req, res) {
    const {
      username,
      game,
      level,
      score,
    } = req.body;
    // save game score
    db.none('INSERT INTO "game.dbo".player_history("user", "game", "difficulty_level", "score") VALUES($1,$2,$3,$4)', [username, game, level, score])
      .then(() => {
        res.send('score recorded');
      })
      .catch(err => console.error(err));
  },

  leaderBoard(req, res) {
    const {
      game,
    } = req.body;
    console.log('req bod ', req.body);
    console.log('game in leaderboard control ', game);

    /** Aggregated scores by (user,game), (user, game, difficulty_level) */
    db.query(`SELECT "user", game, coalesce(difficulty_level, 'ALL') as difficulty_level, sum(score) sum, avg(score) avg, count (*) gamecount
              FROM "game.dbo".player_history 
              WHERE "game" = $1
              GROUP BY GROUPING SETS (("user", game), ("user",game, difficulty_level));`,
    [game])
      .then((data) => {
        console.log('leaderboard data', data);
        return res.json(data);
      })
      .catch(err => console.error(err));
  },
};
