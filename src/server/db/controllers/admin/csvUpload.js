const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const db = require('../util/postgres');

module.exports = {

  writeToCardsTable(req, res) {
    csv.fromPath(path.join(__dirname, '../admin/csv.csv'), {
      headers: true,
    })
      .on('data', (data) => {
        console.log(data);
        const {
          game_id,
          Card_Name,
          card_category,
          year,
          mask,
          image,
          image_after,
          ebay_link,
          category_a,
          category_b,
          category_c,
        } = data;

        db.none(`INSERT INTO "game.dbo".cards_n (game_id, card_name, category, year, mask, image, image_after, ebay_link, category_a, category_b, category_c)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, [Number(game_id), Card_Name, card_category, Number(year), mask, image, image_after, ebay_link, category_a, category_b, category_c])
          .catch(err => console.log('EEEERRRRRRRORRRRRR', err));
      })
      .on('end', () => {
        console.log('done');
        res.send({
          msg: 'csv upload complete',
        });
      });
  },
  placeHolder(req, res, next) {
    const {
      csv
    } = req.files;
    csv.mv(path.join(__dirname, './csv.csv'), (err) => {
      console.log('ERRO', err);
      next();
    });
  },
};
