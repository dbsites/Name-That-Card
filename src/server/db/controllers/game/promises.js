const db = require('../util/postgres');

/**
 * but for other games like sports, a card will only appear once in its category
 */
function EasyAnswers(id) { 
  return new Promise( (resolve) => { db.many(`        
          SELECT c1.card_id, c1.card_name, 'EASY' as answer
          FROM "game.dbo".cards_n c
            JOIN "game.dbo".cards_n c1
              ON c.card_category = c1.card_category 
              AND c1.card_id <> $1
          WHERE c.card_id = $1
          ORDER BY RANDOM()
          LIMIT 3;
          `, [id]) 
})
    .then(wrongAnswers => console.log('easy answers ****** '))
    .catch(err => console.error(err));
}

module.exports = {

 loadGame(req, res, next) {
    console.log('body', req.body);
    const {
      game,
      query,
      difficulty_level,
    } = req.body;
    db.many(`
          SELECT c.*
            FROM "game.dbo".cards_n c
              JOIN "game.dbo".game g 
                ON g.game_id = c.game_id
              WHERE g.game_name = $1 AND ($2:raw)  
              ORDER BY RANDOM()
              LIMIT 20;`, [game, query])
      .then((cards) => {
        res.locals.cards = cards;
        res.locals.cards.map(async (card) => {
          card.wrongAnswers = await EasyAnswers(card.card_id)
        });
        console.log('After map****************');
      }).then((result) => {  console.log('after asnyc await ***************************')
        res.json(res.locals.cards)})
      .catch(err => console.error(err));
  },

 

  MediumAnswers(req, res, next) {
    const { card_id } = req.body;
    db.many(`SELECT c1.card_id, c1.card_name, 'MEDIUM' as answer
              FROM "game.dbo".cards_n c
              JOIN "game.dbo".cards_n c1
                ON c.card_category = c1.card_category 
                AND c.category_a = c1.category_a 
                AND c1.card_id <> $1
              WHERE c.card_id = $1
              ORDER BY RANDOM()
              LIMIT 3;
            `, [card_id])
      .then((cards) => {
        return res.send(cards);
      })
      .catch(err => console.error(err));
  },


  hardAnswers(req, res, next) {
    const { card_id, } = req.body;

    db.many(`SELECT c1.card_id, c1.card_name, 'HARD' as answer
              FROM "game.dbo".cards_n c
              JOIN "game.dbo".cards_n c1
                ON c.card_category = c1.card_category 
                  AND c.category_a = c1.category_a 
                  AND c.category_b = c1.category_b
                  AND c1.card_id <> $1
              WHERE c.card_id = $1
              ORDER BY RANDOM()
              LIMIT 3;
            `, [card_id])
      .then((cards) => {
        return res.send(cards);
      })
      .catch(err => console.error(err));
  },


};
