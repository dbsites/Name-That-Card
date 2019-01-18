const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const async = require('async');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const SALT = 10;
const bcrypt = require('bcrypt');

const adminController = require('./src/server/db/controllers/admin/adminController');
const authController = require('./src/server/db/controllers/user/authController');
const cookieController = require('./src/server/db/controllers/cookie/cookieController');
const gameController = require('./src/server/db/controllers/game/gameController');
const playController = require('./src/server/db/controllers/game/playController');
const s3 = require('./src/server/db/controllers/admin/aws/s3_upload');
const csv = require('./src/server/db/controllers/admin/csvUpload');

const sessionController = require('./src/server/db/controllers/session/sessionController');

const db = require('./src/server/db/controllers/util/postgres.js');

const app = express();

require('dotenv').config();


app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
app.use('/favicon.ico', express.static(path.resolve(__dirname, './src/client/assets/favicon.ico')));
app.use(‘/ntcwebpreview.jpg’, express.static(path.resolve(__dirname, ‘./src/client/assets/ntcwebpreview.jpg’)));
// server static files from dist directory
app.use(express.static(path.resolve(__dirname, './dist')));

// eslint-disable-next-line max-len
/* ============================================ User ============================================== */

app.get('/rootPage',
sessionController.checkSSIDSession,
authController.getUserInfo,
(req, res) => {
  res.status(200).send(res.locals.data);
});

app.post('/api/signup',
authController.checkEmailExists,
authController.checkUsernameExists,
authController.createUser,
sessionController.createSession,
cookieController.setSSIDCookie,
(req, res) => res.status(200).json({
  signupSuccess: true,
  loginSuccess: true,
}));

app.post('/api/login',
authController.verifyUser,
sessionController.createSession,
cookieController.setSSIDCookie,
(req, res) => {
  res.status(200).json({
    username: res.locals.user.username,
    loginSuccess: true,
    msg: 'login success',
  });
});

app.delete('/api/logout',
cookieController.deleteSSIDCookie,
sessionController.deleteSession,
(req, res) => {
  res.status(200).json({
    logoutSuccess: true,
  });
});

app.post('/api/forgot', (req, res, next) => {
  async.waterfall([
    (done) => {
      crypto.randomBytes(20, (err, buf) => {
        const token = buf.toString('hex');
        done(err, token);
      })
    },
    (token, done) => {
      const { email_address } = req.body;
      db.any('SELECT * FROM "game.dbo".users where email_address=$1', [email_address])
        .then((data) => {
          console.log('we are here')
          console.log(data)
          if (data[0]) {
            const resetPasswordToken = token;
            const resetPasswordExpires = Date.now() + 3600000;
            console.log('token ', resetPasswordToken)
            db.none('UPDATE "game.dbo".users SET "resetPasswordToken"=$1, "resetPasswordExpires"=$2 WHERE email_address=$3', [resetPasswordToken, resetPasswordExpires, email_address])
              .then((err) => {
                console.log('*** added token and expiration ***');
                //res.locals.user = result;
                done(err, token);
              })
              .catch((err) => {
                console.log(err)
            })
          } else {
            res.send({emailSuccess: false, msg: 'No account associated with that email address'})
          }
        })
    },
    (token) => {
      console.log('token here ', token)
      const { email_address } = req.body
      const smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: process.env.GMAIL_ADDRESS,
          pass: process.env.GMAIL_PW,
        }
      });
      const mailOptions = {
        to: email_address,
        from: process.env.GMAIL_ADDRESS,
        subject: 'Password Reset - Name th?t Card',
        text: 'You are recieving this email because you have requested to reset your password. Please click the following link, or copy and paste the link into your browser to complete the process.' + '\n\n' + 
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'If you did not request this, please ignore this email and your password will remain unchanged.'
      }
      smtpTransport.sendMail(mailOptions, (err) => {
        if(err) {
          return res.send({emailSuccess: false, msg: 'Email failed to send to ' + email_address + '.'})
        }
        return res.send({emailSuccess: true, token: token, msg: 'Success, an e-mail has been sent to ' + email_address + ' with further instructions.'})
        done(err, 'done');
      });
    }
  ])
});

app.post('/api/reset/:token', (req, res, next) => {
  async.waterfall([
    (done) => {
      console.log('params token ', req.params.token)
      db.any('SELECT * FROM "game.dbo".users where "resetPasswordToken"=$1', [req.params.token])
        .then((data) => {
          console.log('result ', data);
          if (data.length !== 0) {
            if (Number(data[0].resetPasswordExpires) > Date.now()) {
              console.log('token has not expired')
              let newPassword = req.body.new_password;
                bcrypt.genSalt(SALT, (saltErr, newSalt) => {
                if (saltErr) {
                  return res.status(500).json({ message: 'Error: Could Not Generate Salt', error: saltErr });
                }
                bcrypt.hash(newPassword, newSalt, (hashErr, hashPass) => {
                  if (hashErr) {
                    return res.status(500).json({ message: 'Error: Could Not Encrypt Password', error: hashErr });
                  }
                  db.none('UPDATE "game.dbo".users SET password=$1 WHERE "resetPasswordToken"=$2', [hashPass, req.params.token])
                    .then((err) => {
                      if(err){
                        return res.json({successfulReset: false, msg: err});
                      }
                      return res.json({successfulReset: true, msg: 'success'})
                    })
                });
              });
            } else {
              return res.json({successfulReset: false, msg: 'Unable to reset password'});
            }
          } else {
            return res.json({successfulReset: false, msg: 'Unable to reset password. Link is invalid or has expired.'});
          }
        });
    }
  ]);
});


// eslint-disable-next-line max-len
/* ============================================ Admin ============================================== */

app.get('/admin/rootPage',
  sessionController.checkAdminSession,
  adminController.getAdminInfo,
  (req, res) => {
    res.status(200).send(res.locals.data);
  });

// app.use(sessionController.checkAdminSession);
app.get('/api/admin',
sessionController.checkAdminSession);

app.post('/admin/login',
  adminController.verifyAdmin,
  sessionController.createAdminSession,
  cookieController.setAdminCookie,
  (req, res) => {
    res.status(200).json({
      username: res.locals.admin.admin_username,
      loginSuccess: true,
      msg: 'login success',
    })
  }
);

app.delete('/admin/logout',
  cookieController.deleteAdminCookie,
  sessionController.deleteAdminSession,
  (req, res) => {
    res.status(200).json({ loginSuccess: false })
  }
);

/* ============================================ Backend CMS ============================================== */
app.post('/admin/submitForm', 
  
  csv.placeHolder,
  csv.writeToCardsTable,

);

app.post('/admin/signup',
  adminController.checkEmailExists,
  adminController.checkAdminUsernameExists,
  adminController.createAdmin,
  sessionController.createAdminSession,
  cookieController.setAdminCookie,
  (req, res) => res.status(200).json({
    signupSuccess: true,
    loginSuccess: true,
  }));


// eslint-disable-next-line max-len
/* ============================================ Game ============================================== */
// requ  est object with game name and level of difficulty

app.get('/api/gameList', gameController.gameList);
app.get('/api/gameMenu/:game', gameController.gameMenu);
app.post('/api/saveScore', playController.saveScore);
app.post('/api/loadGame', playController.loadGame);
app.post('/api/leaderboard', playController.leaderboard);
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, './dist/index.html')));

app.listen(3000, () => console.log('Server is listening on 3000'));
