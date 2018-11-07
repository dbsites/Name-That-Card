const db = require('../util/postgres');

/**
  * but for other games like sports, a card will only appear once in its category
 */
module.exports = {
  loadGame(req, res, next) {
    const {
      game,
      vintage,
      modern,
      standard,
      legacy,
      old_school,
      difficulty_level,
    } = req.body;

    db.any(`SELECT card_id, card_name, mask, image, ebay_link, l.vintage, l.modern, l.standard, l.old_school, l.legacy, image_location_temp
            FROM "game.dbo".cards_n c
              JOIN "game.dbo".mtg_cat_lookup l 
                ON c.card_category = l.smvlo
              JOIN "game.dbo".game g 
                ON g.game_id = c.game_id
              WHERE g.game_name =$1
          --case when MTG
              AND 1 = CASE WHEN l.vintage IS NOT NULL AND $2 = 1 THEN 1 
                           WHEN l.modern IS NOT NULL AND $3 = 1 THEN 1 
                           WHEN l.standard IS NOT NULL AND $4 = 1 THEN 1 
                           WHEN l.legacy IS NOT NULL AND $5 = 1 THEN 1 
                           WHEN l.old_school IS NOT NULL AND $6 = 1 THEN 1 END
              ORDER BY RANDOM()
          -- second case for other games
          -- when game_is not MTG
          --  then use the second case
          LIMIT 20;`, [game, vintage, modern, standard, legacy, old_school])
      .then((data) => {
        console.log('data', data);
        return res.send(data);
      })

      .catch(err => console.error(err));
  },
  saveScore(req, res, next) {
    console.log('here');
    const { username, game, difficulty_level, score } = req.body;
    db.none('INSERT INTO "game.dbo".player_history("user", "game", "difficulty_level", "score") VALUES($1,$2,$3,$4)', [username, game, difficulty_level, score])
      .then(() => {
        res.send('score recorded');
      })
      .catch(err => console.error(err));
  },

  wrongAnswers(req, res, next) {
    const {
      card_id,
      game,
      difficulty_level,
    } = req.body;
    /**
     * receives a card_id, game and difficulty level
     * runs the rules for the game and level
     * matches rules with cards
     *
     */
    db.task('get-categories-for-diff-level', t => t.one(`SELECT 
                  lkg.game_id 
                  , category
                FROM "game.dbo".game_card_cat_lookup lkg
                  JOIN "game.dbo".game_rules gr
                    ON lkg.game_id = gr.game_id
                    AND lkg.definition = gr.column
                WHERE difficulty_level = $1 AND game_name = $2`, [difficulty_level, game])
      .then((rule) => {
        res.locals.rule = rule;
        return t.any(`SELECT 
                          card_id, 
                          card_name
                        FROM "game.dbo".cards_n 
                        WHERE 1 = case when card_id <> $1 and category_a is not null and $2 = 'category_a' THEN 1 
                                        when card_id <> $1 and category_b is not null and $2 = 'category_b' THEN 1
                                        when card_id <> $1 and category_c is not null and $2 = 'category_c' THEN 1
                                        when card_id <> $1 and category_d is not null and $2 = 'category_d' THEN 1
                        END
                        ORDER BY RANDOM()
                        LIMIT 80;
                        
            `, [card_id, rule.category]);
      }))
      .then((data) => {
        console.log('rule', res.locals.rule);
        const { rule } = res.locals;
        data.forEach((element) => {
          element.rule = rule;
        });
        return res.send(data);
        next();
      })

      .catch(err => console.error(err));
  },


  // last
};
