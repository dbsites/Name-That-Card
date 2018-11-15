const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const db = require('../util/postgres');

module.exports = {

  createUser: (req, res, next) => {
    // console.log('====================================');
    // console.log('You are in authController createUser');
    // console.log('*** req.body ***', req.body);

    const userInfo = req.body;
    const {
      username,
      password,
      email_address,
    } = userInfo;
    const userInputs = [username, password, email_address];

    const addNewUser = () => {
      db.one(`INSERT INTO "game.dbo".users("username", "password", "email_address") VALUES($1, $2, $3);
      SELECT * FROM "game.dbo".users where email_address=$3`, userInputs)
        .then((result) => {
          console.log('*** result ***', result);
          res.locals.user = result;
          next();
        })
        .catch(err => res.status(500).send(err));
    };

    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => bcrypt.hash(password, salt))
      .then((hash) => {
        userInputs[1] = hash;
      })
      .then(() => addNewUser())
      .catch(err => res.status(500).send(err));
  },

  checkEmailExists: (req, res, next) => {
    // console.log('==========================================');
    // console.log('You are in authController checkEmailExists');
    // console.log('*** req.body.email_address ***', req.body.email_address);

    const { email_address } = req.body;
    db.any('SELECT * FROM "game.dbo".users where email_address=$1', [email_address])
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

  checkUsernameExists: (req, res, next) => {
    // console.log('=============================================');
    // console.log('You are in authController checkUsernameExists');
    // console.log('*** req.body.username ***', req.body.username);

    const { username } = req.body;
    db.any('SELECT * FROM "game.dbo".users where username=$1', [username])
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

    db.one(`SELECT session.user_id, users.username, session.ssid
    FROM "game.dbo".sessions as session
    JOIN "game.dbo".users as users
    ON users.user_id = session.user_id
    WHERE session.user_id = ${integer}`)
    .then((data) => {
      console.log('******* res.locals.user.id *****',res.locals.user.id);
      res.locals.data = data;
      next();
    })
    .catch(err => console.log(err));
  },

  verifyUser(req, res, next) {
    // console.log('====================================');
    // console.log('You are in authController verifyUser');
    // console.log('*** req.body ***', req.body);

    const { email_address, password } = req.body;
    db.any('SELECT * FROM "game.dbo".users WHERE email_address=$1', [email_address])
      .then((data) => {
        console.log('*** data ***', data);
        const user = data[0];
        console.log('*** user ***', user);
        bcrypt.compare(password, user.password, (error, resolve) => {
          if (resolve) {
            res.locals.user = user;
            console.log('*** verified user ***', res.locals.user);
            return next();
          }
          return res.status(400).send({
            loginSuccess: false,
            msg: 'login failed, send a message to user to check email & password or signup',
          });
        });
      })
      .catch(err => console.error(err));
  },
};
