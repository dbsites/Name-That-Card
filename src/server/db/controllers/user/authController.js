const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const db = require('../util/postgres');

module.exports = {

  createUser: (req, res, next) => {
    const userInfo = req.body;
    const {
      username,
      password,
      email,
    } = userInfo;
    const userInputs = [username, password, email];

    // eslint-disable-next-line no-unused-expressions
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-unused-expressions
    addNewUser = () => {
      db.none('INSERT INTO "game.dbo".users("username", "password", "email_address") VALUES($1, $2, $3)', userInputs)
        .then(() => {
          res.send({ msg: `${username} created` });
          console.log(`User ${username} created`);
        })
        .catch(err => console.error(err));
    },

    bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => bcrypt.hash(password, salt))
      .then((hash) => {
        userInputs[1] = hash;
      })
      // eslint-disable-next-line no-undef
      .then(() => addNewUser())
      .catch(err => console.error(err));
  },

  checkEmailExists: (req, res, next) => {
    const { email_address } = req.body;
    db.any('SELECT * FROM "game.dbo".users where email_address=$1', [email_address])
      .then((data) => {
        if (data[0]) {
          return res.send({
            msg: 'email already exists',
            signUpSuccess: false,

          });
        } return next();
      })
      .catch(err => console.error(err));
  },

  checkUsernameExists: (req, res, next) => {
    const { username } = req.body;
    db.any('SELECT * FROM "game.dbo".users where username=$1', [username])
      .then((data) => {
        if (data[0]) {
          return res.send({
            msg: 'username already exists',
            signUpSuccess: false,
          });
        } return next();
      })
      .catch(err => console.error(err));
  },
  verifyUser(req, res, next) {
    const { email_address, password } = req.body;
    db.any('SELECT * FROM "game.dbo".users WHERE email_address=$1', [email_adress])
      .then((data) => {
        console.log('data', data);
        const user = data[0];
        console.log('user****', user, '******');
        bcrypt.compare(password, user.password, (error, resolve) => {
          if (resolve) {
            res.locals.verifiedUser = user;
            console.log('************* verified user', res.locals.verifiedUser);
            return next();
          }
          return res.status(400).send({
            loginSuccess: false,
            msg: 'login failed',
          });
        });
      })
      .catch(err => console.error(err));
  },

  verifyAdmin(req, res, next) {
    const { email_address, password } = req.body;
    db.any('SELECT * FROM "game.dbo".admin WHERE email_address=$1', [email_address])
      .then((data) => {
        console.log('data', data);
        const user = data[0];
        console.log('user****', admin, '******');
        bcrypt.compare(password, admin.password, (error, resolve) => {
          if (resolve) {
            res.locals.verifiedAdmin = user;
            console.log('************* verified admin', res.locals.verifiedAdmin);
            return next();
          }
          return res.status(400).send({
            loginSuccess: false,
            msg: 'login failed',
          });
        });
      })
      .catch(err => console.error(err));
  },
};
