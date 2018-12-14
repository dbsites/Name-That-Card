import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import GameMenuContainer from './containers/GameMenuContainer.jsx';
import GameContainer from './containers/GameContainer.jsx';
import GameListContainer from './containers/GameListContainer.jsx';
import Navigation from './components/Navigation.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Footer from './components/Footer.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import ToS from './components/ToS.jsx';
import About from './components/About.jsx';
import AdminContainer from './containers/AdminContainer.jsx';
import Forgot from './components/Forgot.jsx';
import Reset from './components/Reset.jsx';
import LeaderboardContainer from './containers/LeaderboardContainer.jsx';
import * as userActions from './actions/userActions';
import * as leaderboardActions from './actions/leaderboardActions';
import * as gameConfigActions from './actions/gameConfigActions';

const mapStateToProps = store => ({
  isLoggedIn: store.userReducer.isLoggedIn,
  loggedInUser: store.userReducer.loggedInUser,
  loginError: store.userReducer.loginError,
  loginErrorMsg: store.userReducer.loginErrorMsg,
  selectedGame: store.gameListReducer.selectedGame,
  signUpError: store.userReducer.signUpError,
  signUpErrorMsg: store.userReducer.signUpErrorMsg,
  signUpInputEmail: store.userReducer.signUpInputEmail,
  signUpInputPassword: store.userReducer.signUpInputPassword,
  signUpInputUsername: store.userReducer.signUpInputUsername,
  forgotInputEmail: store.userReducer.forgotInputEmail,
  loginInputEmail: store.userReducer.loginInputEmail,
  loginInputPassword: store.userReducer.loginInputPassword,
  questionNumber: store.gameReducer.questionNumber,
  passwordErrorMsg: store.userReducer.passwordErrorMsg,
  usernameErrorMsg: store.userReducer.usernameErrorMsg,
  emailErrorMsg: store.userReducer.emailErrorMsg,
  emailStatusMsg: store.userReducer.emailStatusMsg,
  emailSuccess: store.userReducer.emailSuccess,
  firstNewPassword: store.userReducer.firstNewPassword,
  secondNewPassword: store.userReducer.secondNewPassword,
  newPasswordStatusMsg: store.userReducer.newPasswordStatusMsg,
  passwordReset: store.userReducer.passwordReset,
});

const mapDispatchToProps = dispatch => ({
  updateSignUpUsername: (event) => {
    dispatch(userActions.updateSignUpUsername(event));
  },
  updateSignUpPassword: (event) => {
    dispatch(userActions.updateSignUpPassword(event));
  },
  updateSignUpEmail: (event) => {
    dispatch(userActions.updateSignUpEmail(event));
  },
  submitSignUp: (obj) => {
    dispatch(userActions.submitSignUp(obj));
  },
  updateLoginEmail: (event) => {
    dispatch(userActions.updateLoginEmail(event));
  },
  updateLoginPassword: (event) => {
    dispatch(userActions.updateLoginPassword(event));
  },
  updateForgotInputEmail: (event) => {
    dispatch(userActions.updateForgotInputEmail(event));
  },
  submitLogin: (obj) => {
    dispatch(userActions.submitLogin(obj));
  },
  logout: () => {
    dispatch(userActions.logout());
  },
  checkAuth: () => {
    dispatch(userActions.checkAuth());
  },
  resetLoginInfo: () => {
    dispatch(userActions.resetLoginInfo());
  },
  resetSignUpInfo: () => {
    dispatch(userActions.resetSignUpInfo());
  },
  resetLeaderboardLoadingContent: () => {
    dispatch(leaderboardActions.resetLeaderboardLoadingContent());
  },
  setSignUpCredentialErrors: () => {
    dispatch(userActions.setSignUpCredentialErrors());
  },
  sendResetPwEmail: (emailObj) => {
    dispatch(userActions.sendResetPwEmail(emailObj));
  },
  updateFirstNewPassword: (event) => {
    dispatch(userActions.updateFirstNewPassword(event));
  },
  updateSecondNewPassword: (event) => {
    dispatch(userActions.updateSecondNewPassword(event));
  },
  resetPassword: (newPasswordObj) => {
    dispatch(userActions.resetPassword(newPasswordObj));
  },
  setNewPasswordErrors: () => {
    dispatch(userActions.setNewPasswordErrors());
  },
  resetNewPasswordEmailInputs: () => {
    dispatch(userActions.resetNewPasswordEmailInputs());
  },
  resetNewPasswordInputs: () => {
    dispatch(userActions.resetNewPasswordInputs());
  },
  resetRenderScoreFooter: () => {
    dispatch(gameConfigActions.resetRenderScoreFooter());
  },
  resetFooterBool: () => {
    dispatch(gameConfigActions.resetFooterBool());
  },
});

const App = (props) => {
  const { selectedGame, updateSignUpUsername, updateSignUpPassword, updateSignUpEmail, submitSignUp, updateLoginEmail, updateLoginPassword, submitLogin, isLoggedIn, signUpError, signUpErrorMsg, signUpInputUsername, signUpInputPassword, signUpInputEmail, loginInputEmail, loginInputPassword, loggedInUser, logout, questionNumber, checkAuth, resetLoginInfo, resetSignUpInfo, loginError, loginErrorMsg, resetLeaderboardLoadingContent, passwordErrorMsg, usernameErrorMsg, emailErrorMsg, setSignUpCredentialErrors, forgotInputEmail, updateForgotInputEmail, sendResetPwEmail, emailStatusMsg, emailSuccess, updateFirstNewPassword, updateSecondNewPassword, firstNewPassword, secondNewPassword, resetPassword, newPasswordStatusMsg, setNewPasswordErrors, resetNewPasswordEmailInputs, resetNewPasswordInputs, resetRenderScoreFooter, passwordReset, resetFooterBool } = props;
  // if (!isLoggedIn) {
  //   checkAuth();
  // }
  console.log('user ', loggedInUser);
  return (
    <BrowserRouter>
      <div>
        <Navigation questionNumber={questionNumber} logout={logout} isLoggedIn={isLoggedIn} selectedGame={selectedGame} loggedInUser={loggedInUser} />
        <Switch>
          <Route path='/' component={GameListContainer} exact />
          <Route path='/gameMenu/:game' component={GameMenuContainer} />
          <Route path='/game' component={GameContainer} />
          <Route path='/leaderboard/:game' render={(props) =>
            <LeaderboardContainer {...props} selectedGame={selectedGame} />}
          />
          <Route path='/login' render={(props) =>
            <Login {...props} resetFooterBool={resetFooterBool} passwordReset={passwordReset} resetRenderScoreFooter={resetRenderScoreFooter} resetLeaderboardLoadingContent={resetLeaderboardLoadingContent} selectedGame={selectedGame} loginError={loginError} loginErrorMsg={loginErrorMsg} resetLoginInfo={resetLoginInfo} updateLoginEmail={updateLoginEmail} updateLoginPassword={updateLoginPassword} submitLogin={submitLogin} isLoggedIn={isLoggedIn} loginInputEmail={loginInputEmail} loginInputPassword={loginInputPassword} />}
          />
          <Route path='/signup' render={(props) =>
            <Signup {...props} resetFooterBool={resetFooterBool} resetRenderScoreFooter={resetRenderScoreFooter} setSignUpCredentialErrors={setSignUpCredentialErrors} emailErrorMsg={emailErrorMsg} passwordErrorMsg={passwordErrorMsg} usernameErrorMsg={usernameErrorMsg} resetLeaderboardLoadingContent={resetLeaderboardLoadingContent} selectedGame={selectedGame} resetSignUpInfo={resetSignUpInfo} signUpInputUsername={signUpInputUsername} signUpInputPassword={signUpInputPassword} signUpInputEmail={signUpInputEmail} signUpErrorMsg={signUpErrorMsg} signUpError={signUpError} updateSignUpUsername={updateSignUpUsername} updateSignUpPassword={updateSignUpPassword} updateSignUpEmail={updateSignUpEmail} submitSignUp={submitSignUp} isLoggedIn={isLoggedIn}/>}
          />
          <Route path='/admin' component={AdminContainer} />
          <Route path='/about' render={(props) => 
            <About {...props} selectedGame={selectedGame}/>}
          />
          <Route path='/terms-of-service' component={ToS} />
          <Route path='/privacy-policy' component={PrivacyPolicy} />
          <Route path='/forgot-pw' render={(props) =>
            <Forgot {...props} resetNewPasswordEmailInputs={resetNewPasswordEmailInputs} emailSuccess={emailSuccess} emailStatusMsg={emailStatusMsg} sendResetPwEmail={sendResetPwEmail} updateForgotInputEmail={updateForgotInputEmail} forgotInputEmail={forgotInputEmail} />}
          />
          <Route path='/reset/:token' render={(props) =>
            <Reset {...props} passwordReset={passwordReset} resetNewPasswordInputs={resetNewPasswordInputs} setNewPasswordErrors={setNewPasswordErrors} resetPassword={resetPassword} newPasswordStatusMsg={newPasswordStatusMsg} updateFirstNewPassword={updateFirstNewPassword} updateSecondNewPassword={updateSecondNewPassword} firstNewPassword={firstNewPassword} secondNewPassword={secondNewPassword} />}
          />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
