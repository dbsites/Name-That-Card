const db = require('../util/postgres');


module.exports = {
  loadGame(req, res, next) {
    const { game, vintage, modern, standard, legacy, old_school } = req.body;
   
    db.any(`SELECT 
              card_id
              , card_name
              , mask
              , image
              , ebay_link
              , l.vintage
              , l.modern
              , l.standard
              , l.old_school
              , l.legacy
              , image_location_temp
            FROM "game.dbo".cards_n c
            JOIN "game.dbo".mtg_cat_lookup l 
              ON c.category_c = l.smvlo
            JOIN "game.dbo".game g 
              ON g.game_id = c.game_id
            WHERE g.game_name =$1
              AND 1 = CASE WHEN l.vintage IS NOT NULL AND $2 = 1 THEN 1 
                          WHEN l.modern IS NOT NULL AND $3 = 1 THEN 1 
                          WHEN l.standard IS NOT NULL AND $4 = 1 THEN 1 
                          WHEN l.legacy IS NOT NULL AND $5 = 1 THEN 1 
                          WHEN l.old_school IS NOT NULL AND $6 = 1 THEN 1 END
            ORDER BY RANDOM()
            LIMIT 20;`, [game, vintage, modern, standard, legacy, old_school])
      .then((data) => {
        console.log('loaddata data', data);
        return res.send(data);
      })
     
      .catch(err => console.error(err));
  },
}
 