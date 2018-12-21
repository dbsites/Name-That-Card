const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const db = require('../util/postgres');

module.exports = {
  createAdmin: (req, res, next) => {
    console.log('====================================');
    console.log('You are in adminController createAdmin');
    console.log('*** req.body ***', req.body);

    const adminInfo = req.body;
    const {
      admin_username,
      password,
      email_address,
    } = adminInfo;
    const adminInputs = [admin_username, password, email_address];

    const addNewAdmin = () => {
      db.one(`INSERT INTO "game.dbo".admin("admin_username", "password", "email_address") VALUES($1, $2, $3);
      SELECT * FROM "game.dbo".admin where email_address=$3`, adminInputs)
        .then((result) => {
          console.log('*** result ***', result);
          res.locals.admin = result;
          next();
        })
        .catch(err => res.status(500).send(err));
    };

    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => bcrypt.hash(password, salt))
      .then((hash) => {
        adminInputs[1] = hash;
      })
      .then(() => addNewAdmin())
      .catch(err => res.status(500).send(err));
  },

  checkEmailExists: (req, res, next) => {
    console.log('==========================================');
    console.log('You are in authController checkEmailExists');
    console.log('*** req.body.email_address ***', req.body.email_address);

    const { email_address } = req.body;
    db.any('SELECT * FROM "game.dbo".admin where email_address=$1', [email_address])
      .then((data) => {
        console.log('*** data ***', data)
        if (data[0]) {
          return res.send({
            msg: 'email already exists',
            signupSuccess: false,
          });
        }
        // Only returns next if email_address is not in DB
        return next();
      })
      .catch(err => res.status(500).send(err));
  },

  checkAdminUsernameExists: (req, res, next) => {
    console.log('=============================================');
    console.log('You are in authController checkAdminUsernameExists');
    console.log('*** req.body.admin_username ***', req.body.admin_username);

    const { admin_username } = req.body;
    db.any('SELECT * FROM "game.dbo".admin where admin_username=$1', [admin_username])
      .then((data) => {
        if (data[0]) {
          return res.send({
            msg: 'username already exists',
            signupSuccess: false,
          });
        }
        // Only returns next if username is not in DB
        return next();
      })
      .catch(err => res.status(500).send(err));
  },

  getAdminInfo: (req, res, next) => {
    console.log('=============================================');
    console.log('You are in adminController getAdminInfo');
    console.log('*** req.body ***', req.body);
    console.log('*** res.locals ***', res.locals);

    const { id } = res.locals.admin;
    const integer = Number(id);

    db.one(`SELECT admin_sessions.admin_id, admin.admin_username, admin_sessions.ssid_sessions
    FROM "game.dbo".admin_sessions as admin_sessions
    JOIN "game.dbo".admin as admin
    ON admin.admin_id = admin_sessions.admin_id
    WHERE admin_sessions.admin_id = ${integer}`)
      .then((data) => {
        res.locals.data = data;
        console.log('******* res.locals.data *****', res.locals.data);
        next();
      })
      .catch(err => console.log(err));
  },

  verifyAdmin(req, res, next) {
    console.log('====================================');
    console.log('You are in adminController verifyAdmin');
    console.log('*** req.body ***', req.body);

    const { admin_username, password } = req.body;
    db.any('SELECT * FROM "game.dbo".admin WHERE admin_username=$1', [admin_username])
      .then((data) => {
        console.log('*** data ***', data);
        const admin = data[0];
        console.log('*** user ***', admin);
        if (!data[0]) {
          return res.status(200).send({
            loginSuccess: false,
            msg: 'Incorrect email address or password',
          })
        } else {
          bcrypt.compare(password, admin.password, (error, resolve) => {
            if (resolve) {
              res.locals.admin = admin;
              console.log('*** verified admin ***', res.locals.admin);
              return next();
            }
            return res.status(200).send({
              loginSuccess: true,
              msg: 'successful logged in',
            });
          });
        }
      })
      .catch(err => console.error(err));
  },

};
