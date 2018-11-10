const db = require('../util/postgres');
const uuidv4 = require('uuid/v4');
 
module.exports = {
  // Check if cookie for SSID is available in the req
  checkSSIDSession: (req, res) => {
    if (req.cookies.ssid) {
      // If a matching session exists, set loginStatus to 'success'
      db.one('SELECT ssid FROM "game.dbo".sessions WHERE ssid = $1', [req.cookies.ssid])
        .then((session) => {
          console.log('*******', session);
          res.json({
            loggedIn: true,
          });
        })
        .catch(() => {
          res.json({
            loggedIn: false,
          });
        });
    } else {
      res.json({
        loggedIn: false,
      });
    }
  },

  createSession: (req, res, next) => {
    // Send query to Postgres DB to add user to users
    console.log('here in startSession');
    console.log('body:', req.body);
    db.one('SELECT ssid FROM "game.dbo".sessions WHERE user_id = $1', [res.locals.user.user_id])
      .then((result) => {
        res.locals.ssid = result.ssid;
        next();
      })
      .then(() => {
        res.locals.ssid = uuidv4();
        db.none('INSERT INTO "game.dbo".sessions(user_id,ssid) VALUES ($1, $2)', [res.locals.user.user_id, res.locals.ssid])
          .then(() => {
            next();
          })
          .catch(() => {
            res.status(500).send();
          });
      });
  },

  checkAdminSession: (req, res) => {
    if (req.cookies.admin) {
      // If a matching session exists, set loginStatus to 'success'
      db.one('SELECT ssid_sessions FROM "game.dbo".adminSessions WHERE ssid_sessions = $1', [req.cookies.ssid_sessions])
        .then((session) => {
          console.log('*******', session);
          res.json({
            loggedIn: true,
          });
        })
        .catch(() => {
          res.json({
            loggedIn: false,
          });
        });
    } else {
      res.json({
        loggedIn: false,
      });
    }
  },

  createAdminSession: (req, res, next) => {
    // Send query to Postgres DB to add user to users
    console.log('here in admin Session');
    console.log('body:', req.body);
    db.one('SELECT ssid_sessions FROM "game.dbo".adminSessions WHERE admin_id = $1', [res.locals.admin.admin_id])
      .then((result) => {
        res.locals.ssid_sessions = result.ssid_sessions;
        next();
      })
      .catch(() => {
        res.locals.ssid_sessions = uuidv4();
        db.none('INSERT INTO "game.dbo".adminSessions(admin_id,ssid_sessions) VALUES ($1, $2)', [res.locals.admin.admin_id, res.locals.ssid_sessions])
          .then(() => {
            next();
          })
          .catch(() => {
            res.status(500).send();
          });
      });
  },
};
