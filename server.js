const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./src/server/db/controllers/user/authController');
const gameController = require('./src/server/db/controllers/game/gameController');
const playController = require('./src/server/db/controllers/game/playController');
const playing = require('./src/server/db/controllers/game/playing');
 
const finalPlay = require('./src/server/db/controllers/game/finalPlayController');


const app = express();


app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.post('/login',
  authController.verifyUser,
  (req, res) => {
    res.status(200).json({ username: res.locals.verifiedUser.username, loginSuccess: true, msg: 'login success' });
  });


app.post('/signup',
  authController.checkEmailExists,
  authController.checkUsernameExists,
  authController.createUser,
  (req, res) => res.status(200).json({ signUpSuccess: true }));

/**
   * request object
   * game name and level of difficulty
   */
app.get('/gameList', gameController.gameList);
app.get('/gameMenu/:game', gameController.gameMenu);
// app.post('/loadGame', playController.loadGame);

app.post('/wrongAnswers', playController.wrongAnswers);
app.post('/saveScore', playController.saveScore);
app.post('/loadGame', finalPlay.loadGame);
 

app.listen(3000, () => console.log('server is listening on 3000'));
