const uuidv4 = require('uuid/v4');
const db = require('../util/postgres');

module.exports = {
  // Check if cookie for SSID is available in the req
  checkSSIDSession: (req, res, next) => {
    if (req.cookies.ssid) {
      // If a matching session exists, set loginStatus to 'success'
      db.one('SELECT ssid FROM "game.dbo".sessions WHERE ssid = $1', [req.cookies.ssid])
        .then(session => {
          console.log('*******', session);
          res.json({ loggedIn: true });
        })
        .catch((err) => {
          next();
        })
    } else {
      next();
    }
  },

  createSession: (req, res, next) => {
    // Send query to Postgres DB to add user to users
    console.log('here in startSession');
    console.log('body:', req.body);
    db.none('INSERT INTO "game.dbo".sessions(user_id,ssid) VALUES ($1, $2)', [req.body.user_id, req.body.ssid])
      .then(result => next())
      .catch((err) => {
        res.status(500).send();
      });
  },
};
