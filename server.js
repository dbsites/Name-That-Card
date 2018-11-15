const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const adminController = require('./src/server/db/controllers/admin/adminController');
const authController = require('./src/server/db/controllers/user/authController');
const cookieController = require('./src/server/db/controllers/cookie/cookieController');
const gameController = require('./src/server/db/controllers/game/gameController');
const playController = require('./src/server/db/controllers/game/playController');
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

/* ============================================ User ============================================== */

app.get('/rootPage',
  sessionController.checkSSIDSession,
  authController.getUserInfo,
  (req, res) => {
    res.status(200).send(res.locals.data);
  });

app.post('/signup',
  authController.checkEmailExists,
  authController.checkUsernameExists,
  authController.createUser,
  sessionController.createSession,
  cookieController.setSSIDCookie,
  (req, res) => res.status(200).json({ signupSuccess: true, loginSuccess: true })
);

app.post('/login',
  authController.verifyUser,
  sessionController.createSession,
  cookieController.setSSIDCookie,
  (req, res) => {
    res.status(200).json({ username: res.locals.user.username, loginSuccess: true, msg: 'login success' });
  }
);

app.delete('/logout',
  cookieController.deleteSSIDCookie,
  sessionController.deleteSession,
  (req, res) => {
    res.status(200).json({ loginSuccess: false })
  }
);
/* ============================================ Admin ============================================== */

app.get('/admin/login',
  sessionController.checkAdminSession);

app.post('/admin/login',
  adminController.verifyAdmin,
  sessionController.createAdminSession,
  cookieController.setAdminCookie,
  (req, res) => {
    res.status(200).json({ username: res.locals.admin.admin_username, loginSuccess: true, msg: 'login success' });
  });

// app.use(sessionController.checkAdminSession);
app.get('/admin',
  sessionController.checkAdminSession);

/* ============================================ Backend CMS ============================================== */
app.post('/admin/submitForm');

app.post('/admin/signup',
  adminController.checkEmailExists,
  adminController.checkAdminUsernameExists,
  adminController.createAdmin,
  sessionController.createAdminSession,
  cookieController.setAdminCookie,
  (req, res) => res.status(200).json({ signupSuccess: true }));

/* ============================================ Game ============================================== */
// request object with game name and level of difficulty

app.get('/gameList', gameController.gameList);
app.get('/gameMenu/:game', gameController.gameMenu);
app.post('/saveScore', playController.saveScore);
app.post('/loadGame', playController.loadGame);
app.post('/leaderBoard', playController.leaderBoard);

app.listen(3000, () => console.log('server is listening on 3000'));