const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./src/server/db/controllers/user/authController');

const app = express(); 


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
    res.status(200).json({username: res.locals.verifiedUser.username, loginSuccess: true, msg: 'login success'});
  });


app.post('/signup',
  authController.checkEmailExists,
  authController.checkUsernameExists,
  authController.createUser,
  (req, res) => {
    res.status(200).json({signUpSuccess: true });
  });

app.listen(3000, () => console.log('server is listening on 3000'));
