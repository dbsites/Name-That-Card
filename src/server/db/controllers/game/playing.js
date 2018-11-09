const db = require('../util/postgres');

/**
 * but for other games like sports, a card will only appear once in its category
 */
module.exports = {

  playing(req, res, next) {
    console.log('body', req.body);
    const {
      game,
      query,
      difficulty_level,
    } = req.body;
    db.task('generate wrong answers', t => t.many(`
          SELECT c.*
            lkg.category as ruleColumns
            FROM "game.dbo".cards_n c
              JOIN "game.dbo".game g 
                ON g.game_id = c.game_id
              JOIN "game.dbo".game_card_cat_lookup AS lkg
                ON c.game_id = lkg.game_id
              JOIN "game.dbo".game_rules AS gr 
                ON lkg.game_id = gr.game_id 
                AND lkg.definition = gr.column
              WHERE game_name = $1 AND ($2:raw) AND difficulty_level = $3
              ORDER BY RANDOM()
              LIMIT 20;`, [game, query, difficulty_level])
      .then((cards) => {
        res.locals.cards = cards;
        const ids = [];
        cards.forEach((card) => {
          ids.push(card.card_id);
        });
        res.locals.ids = ids;
        return t.any(`select c.card_name, card_category, variable_a, variable_b, variable_c
                      FROM "game.dbo".cards_n c
                        JOIN "game.dbo".game g 
                        ON g.game_id = c.game_id
                      WHERE game_name = $1 AND ($2:raw) AND c.card_id not in ($3:csv)
                      ORDER BY RANDOM()
                      LIMIT 100;`, [game, query, ids]);
      }))
      .then((data) => {
        const { cards } = res.locals;
        const newObj = {};
        newObj.cards = cards; 
        newObj.answers = data
        return res.send(newObj);
      })
      .catch(err => console.error(err));
  },
};
