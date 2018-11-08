const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const authController = require('./src/server/db/controllers/user/authController');
const cookieController = require('./src/server/db/controllers/cookie/cookieController');
const gameController = require('./src/server/db/controllers/game/gameController');
const playController = require('./src/server/db/controllers/game/playController');
const promises = require('./src/server/db/controllers/game/promises');
 
const finalPlay = require('./src/server/db/controllers/game/finalPlayController');

const sessionController = require('./src/server/db/controllers/session/sessionController');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/rootpage',
  sessionController.checkSSIDSession
);

app.post('/login',
  authController.verifyUser,
  sessionController.createSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.status(200).json({ username: res.locals.user.username, loginSuccess: true, msg: 'login success' });
  });

app.post('/signup',
  authController.checkEmailExists,
  authController.checkUsernameExists,
  authController.createUser,
  sessionController.createSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    return res.status(200).json({ signUpSuccess: true });
  });

/**
 * request object with 
 * game name and level of difficulty
 */
app.get('/gameList', gameController.gameList);
app.get('/gameMenu/:game', gameController.gameMenu);
// app.post('/loadGame', playController.loadGame);

app.post('/wrongAnswers', playController.wrongAnswers);
app.post('/saveScore', playController.saveScore);
app.post('/loadGame', finalPlay.loadGame);
app.post('/easy', finalPlay.EasyAnswers); 
app.post('/medium', finalPlay.MediumAnswers); 
app.post('/hard', finalPlay.hardAnswers); 
app.post('/promises', promises.loadGame)

/*======================= Admin ==========================*/

app.get('/admin/login',
  sessionController.checkAdminSession
);

app.post('/admin/login',
  authController.verifyAdmin,
  sessionController.createAdminSession,
  cookieController.setAdminCookie,
  (req, res) => {
    res.status(200).json({ username: res.locals.admin.admin_username, loginSuccess: true, msg: 'login success' });
  });

// app.use(sessionController.checkAdminSession);
app.get('/admin',
  sessionController.checkAdminSession
);

/*======================= Backend CMS ==========================*/
app.post('/admin/submitForm',

)

app.listen(3000, () => console.log('server is listening on 3000'));
