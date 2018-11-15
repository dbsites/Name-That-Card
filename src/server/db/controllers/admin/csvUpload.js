const fs = require('fs');
const csv = require('fast-csv');
const db = require('../util/postgres');

module.exports = {

  writeToCardsTable(req, res) {
    const {
      csvLink,
    } = req.body;
    const stream = fs.createReadStream(csvLink);
    // path from local

    csv
      .fromStream(stream, {
        headers: true,
      })
      .on('data', (data) => {
        console.log(data);
        // eslint-disable-next-line max-len
        const {
          game_id,
          card_name,
          card_category,
          year,
          mask,
          image,
          image_after
          ebay_link,
          category_a,
          category_b,
          category_c,
        } = data;

        db.query(`INSERT INTO "game.dbo".cards (game_id, card_name, card_category, year, mask, image, image_after ebay_link, category_a, category_b, category_c))
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`, [game_id, card_name, card_category, year, mask, image, image_after, ebay_link, category_a, category_b, category_c], (err) => {
          if (err) {
            console.log(err);
          }
        });
      })
      .on('end', () => {
        console.log('done');
        res.send('cvs upload complete');
      });
  },
};
