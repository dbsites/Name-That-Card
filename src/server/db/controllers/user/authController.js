const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const db = require('../util/postgres');

module.exports = {

  createUser(req, res, next) {
    const userInfo = req.body;
    const {
      username,
      password,
      email,
    } = userInfo;
    const userInputs = [username, password, email];

    addNewUser = () => {
        db.one('INSERT INTO "game.dbo".users("username", "password", "email_address") VALUES($1, $2, $3)', userInputs)
          .then((data) => {
            const {
              username,
              email_address,
            } = data;
            res.locals.newUser = Object.assign({}, data);

            return next();
          })
          .catch(err => console.error(err));
      },

      bcrypt.genSalt(SALT_WORK_FACTOR)
      .then(salt => bcrypt.hash(password, salt))
      .then((hash) => {
        userInputs[1] = hash;
      })
      .then(() => addNewUser())
      .catch(err => console.error(err));
  },

  checkEmailExists(req, res, next) {
    const { email } = req.body;
    db.any('SELECT * FROM "game.dbo".users where email_address=$1', [email])
      .then((data) => {
        if (data[0]) {
          return res.send({
            msg: 'email already exists',
            signUpSuccess: false

          });
        } else return next();
      })
      .catch(err => console.error(err));
  },

  checkUsernameExists(req, res, next) {
    const { username } = req.body;
    db.any('SELECT * FROM "game.dbo".users where username=$1', [username])
      .then((data) => {
        if (data[0]) {
          return res.send({
            msg: 'username already exists',
            signUpSuccess: false
          });
        } else return next();
      })
      .catch(err => console.error(err));
  },
  verifyUser(req, res, next) {
    const { email, password } = req.body; 
    console.log('email', email)
    console.log('password', password)
    db.any('SELECT * FROM "game.dbo".users WHERE email_address=$1', [email])
      .then((data) => {
        console.log('data', data)
        const user = data[0];
        bcrypt.compare(password, user.password, (error, resolve) => {
          if (resolve) {
            const { username, email } = user;
            res.locals.verifiedUser = Object.assign(user)
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