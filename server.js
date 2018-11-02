const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./src/server/db/controllers/user/authController');

const app = express();
const bcrypt = require('bcrypt');
// Generate a salt
const salt = bcrypt.genSaltSync(8);


app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/login',
  authController.verifyUser,
  // cookieController.setSSIDCookie,
  // set ssid
  (req, res) => {
    res.status(200).json({msg: "login success"});
  });


app.post('/signup',
  authController.checkEmailExists,
  authController.checkUsernameExists,
  authController.createUser,
  (req, res) => {
    res.status(200).json(res.locals.newUser);
  });

app.listen(3000, () => console.log('server is listening on 3000'));
