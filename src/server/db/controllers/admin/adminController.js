const db = require('../util/postgres');
const bcrypt = require('bcrypt');

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
};
