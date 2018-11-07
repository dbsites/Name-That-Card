const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authController = require('./src/server/db/controllers/user/authController');
const cookieController = require('./src/server/db/controllers/cookie/cookieController');
const gameController = require('./src/server/db/controllers/game/gameController');
const playController = require('./src/server/db/controllers/game/playController');
const sessionController = require('./src/server/db/controllers/session/sessionController');

const app = express();

app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/rootpage',
  sessionController.checkSSIDSession
);

app.post('/login',
  authController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.createSession,
  (req, res) => {
    res.status(200).json({ username: res.locals.verifiedUser.username, loginSuccess: true, msg: 'login success' });
  });

app.post('/signup',
  authController.checkEmailExists,
  authController.checkUsernameExists,
  authController.createUser,
  cookieController.setSSIDCookie,
  sessionController.createSession,
  (req, res) => {
    return res.status(200).json({ signUpSuccess: true });
  });

/**
 * request object with 
 * game name and level of difficulty
 */
app.get('/gameList', gameController.gameList);
app.get('/gameMenu/:game', gameController.gameMenu);
app.post('/loadGame', playController.loadGame);

app.listen(3000, () => console.log('server is listening on 3000'));
