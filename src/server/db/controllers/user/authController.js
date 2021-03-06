const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const db = require('../util/postgres');

module.exports = {

  createUser: (req, res, next) => {
    // console.log('====================================');
    // console.log('You are in authController createUser');
    // console.log('*** req.body ***', req.body);

    const addNewUser = (hashedPassword) => {
      db.one(`INSERT INTO users("username", "password", "email_address") VALUES($1, $2, $3);
      SELECT * FROM users where email_address=$3`, [req.body.username, hashedPassword, req.body.email_address])
        .then((result) => {
          console.log('*** result ***', result);
          res.locals.user = result;
          next();
        })
        .catch(err => res.status(500).send(err));
    };

    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => bcrypt.hash(req.body.password, salt))
      .then(hash => addNewUser(hash))
      .catch(err => res.status(500).send(err));
  },

  checkEmailExists: (req, res, next) => {
    // console.log('==========================================');
    // console.log('You are in authController checkEmailExists');
    // console.log('*** req.body.email_address ***', req.body.email_address);

    const { email_address } = req.body;
    db.any('SELECT * FROM users where email_address=$1', [email_address])
      .then((data) => {
        console.log('*** data ***', data)
        if (data[0]) {
          return res.send({
            msg: 'An account associated with this email address already exists',
            signupSuccess: false,
          });
        }
        // Only returns next if email_address is not in DB
        return next();
      })
      .catch(err => res.status(500).send(err));
  },

  checkUsernameExists: (req, res, next) => {
    // console.log('=============================================');
    // console.log('You are in authController checkUsernameExists');
    // console.log('*** req.body.username ***', req.body.username);

    const { username } = req.body;
    db.any('SELECT * FROM users where username=$1', [username])
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

  getUserInfo: (req, res, next) => {
    // console.log('=============================================');
    // console.log('You are in authController getUserInfo');
    // console.log('*** req.body ***', req.body);

    const { id } = res.locals.user;
    const integer = Number(id);

    db.one(`SELECT sessions.user_id, users.username, sessions.ssid
    FROM sessions as sessions
    JOIN users as users
    ON users.user_id = sessions.user_id
    WHERE sessions.user_id = ${integer}`)
      .then((data) => {
        console.log('******* res.locals.user.id *****', res.locals.user.id);
        res.locals.data = data;
        res.locals.data.loginSuccess = true;
        next();
      })
      .catch(err => console.log(err));
  },

  verifyUser(req, res, next) {
    // console.log('====================================');
    // console.log('You are in authController verifyUser');
    // console.log('*** req.body ***', req.body);

    const { email_address, password } = req.body;
    db.any('SELECT * FROM users WHERE email_address=$1', [email_address])
      .then((data) => {
        console.log('*** data ***', data);
        const user = data[0];
        console.log('*** user ***', user);
        if (!data[0]) {
          return res.status(200).send({
            loginSuccess: false,
            msg: 'Incorrect email address or password',
          })
        } else {
          bcrypt.compare(password, user.password, (error, resolve) => {
            if (resolve) {
              res.locals.user = user;
              console.log('*** verified user ***', res.locals.user);
              return next();
            }
            return res.status(200).send({
              loginSuccess: false,
              msg: 'Incorrect email address or password',
            });
          });
        }
      })
      .catch(err => console.error(err));
  },
};
