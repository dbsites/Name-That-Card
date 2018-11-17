const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const db = require('../util/postgres');

module.exports = {

  writeToCardsTable(req, res) {
    const stream = fs.createReadStream(path.join(__dirname, './csv.json'));
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
          image_after,
          ebay_link,
          category_a,
          category_b,
          category_c,
        } = data;

        db.none(`INSERT INTO "game.dbo".cards (game_id, card_name, card_category, year, mask, image, image_after, ebay_link, category_a, category_b, category_c)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11)`, [Number(game_id), card_name, card_category, Number(year), mask, image, image_after, ebay_link, category_a, category_b, category_c])
          .catch(err => console.log('EEEERRRRRRRORRRRRR', err));
      })
      .on('end', () => {
        console.log('done');
        res.send({ msg: 'csv upload complete' });
      });
  },
  placeHolder(req, res, next) {
    fs.writeFile(path.join(__dirname, './csv.json'), JSON.stringify(req.body), 'utf8', () => console.log('written to file'));
    next();
  },
};
