const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcrypt');

const db = require('../util/postgres');

module.exports = {
  verifyAdmin(req, res, next) {
    const { admin_username, password } = req.body;
    db.any('SELECT * FROM "game.dbo".admin WHERE admin_username=$1', [admin_username])
      .then((data) => {
        console.log('data', data);
        const admin = data[0];
        console.log('user****', admin, '******');
        bcrypt.compare(password, admin.password, (error, resolve) => {
          if (resolve) {
            res.locals.admin = admin;
            console.log('************* verified admin', res.locals.admin);
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

  createAdmin: (req, res, next) => {
    const adminInfo = req.body;
    const {
      admin_username,
      password,
      email_address,
    } = adminInfo;
    const adminInputs = [admin_username, password, email_address];

    // eslint-disable-next-line no-unused-expressions
    // eslint-disable-next-line no-undef
    // eslint-disable-next-line no-unused-expressions
    const addNewAdmin = () => {
      db.one(`INSERT INTO "game.dbo".admin("admin_username", "password", "email_address") VALUES($1, $2, $3);
      SELECT * FROM "game.dbo".admin where email_address=$3`, adminInputs)
        .then((result) => {
          console.log('***result***', result);
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
      // eslint-disable-next-line no-undef
      .then(() => addNewAdmin())
      .catch(err => res.status(500).send(err));
  },

  checkEmailExists: (req, res, next) => {
    const { email_address } = req.body;
    db.any('SELECT * FROM "game.dbo".admin where email_address=$1', [email_address])
      .then((data) => {
        if (data[0]) {
          return res.send({
            msg: 'email already exists',
            signUpSuccess: false,
          });
        } return next();
      })
      .catch(err => res.status(500).send(err));
  },

  checkAdminUsernameExists: (req, res, next) => {
    const { admin_username } = req.body;
    db.any('SELECT * FROM "game.dbo".admin where admin_username=$1', [admin_username])
      .then((data) => {
        if (data[0]) {
          return res.send({
            msg: 'username already exists',
            signUpSuccess: false,
          });
        } return next();
      })
      .catch(err => res.status(500).send(err));
  },
};
