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
import * as userActions from './actions/userActions';
import LeaderboardContainer from './containers/LeaderboardContainer.jsx';
import Auth from './components/Auth.jsx';

const mapStateToProps = store => ({
  isLoggedIn: store.userReducer.isLoggedIn,
  loggedInUser: store.userReducer.loggedInUser,
  selectedGame: store.gameListReducer.selectedGame,
  signUpError: store.userReducer.signUpError,
  signUpErrorMsg: store.userReducer.signUpErrorMsg,
  signUpInputEmail: store.userReducer.signUpInputEmail,
  signUpInputPassword: store.userReducer.signUpInputPassword,
  signUpInputUsername: store.userReducer.signUpInputUsername,
  loginInputEmail: store.userReducer.loginInputEmail,
  loginInputPassword: store.userReducer.loginInputPassword,
  questionNumber: store.gameReducer.questionNumber,
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
  submitLogin: (obj) => {
    dispatch(userActions.submitLogin(obj));
  },
  logoutUser: () => {
    dispatch(userActions.logoutUser());
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
});

const App = (props) => {
  const { selectedGame, updateSignUpUsername, updateSignUpPassword, updateSignUpEmail, submitSignUp, updateLoginEmail, updateLoginPassword, submitLogin, isLoggedIn, signUpError, signUpErrorMsg, signUpInputUsername, signUpInputPassword, signUpInputEmail, loginInputEmail, loginInputPassword, loggedInUser, logoutUser, questionNumber, checkAuth, resetLoginInfo, resetSignUpInfo } = props;
  console.log('app ran')
  // if (!isLoggedIn) {
  //   checkAuth();
  // }
  return (
    <BrowserRouter>
      <div>
        <Navigation questionNumber={questionNumber} logoutUser={logoutUser} isLoggedIn={isLoggedIn} selectedGame={selectedGame} loggedInUser={loggedInUser} />
        <Switch>
          <Route path='/' component={GameListContainer} exact />
          <Route path='/gameMenu/:game' component={GameMenuContainer} />
          <Route path='/game' component={GameContainer} />
          <Route path='/leaderBoard' render={(props) =>
            <LeaderboardContainer {...props} selectedGame={selectedGame} />}
          />
          <Route path='/login' render={(props) =>
            <Login {...props} resetLoginInfo={resetLoginInfo} updateLoginEmail={updateLoginEmail} updateLoginPassword={updateLoginPassword} submitLogin={submitLogin} isLoggedIn={isLoggedIn} loginInputEmail={loginInputEmail} loginInputPassword={loginInputPassword} />}
          />
          <Route path='/signup' render={(props) =>
            <Signup {...props} resetSignUpInfo={resetSignUpInfo} signUpInputUsername={signUpInputUsername} signUpInputPassword={signUpInputPassword} signUpInputEmail={signUpInputEmail} signUpErrorMsg={signUpErrorMsg} signUpError={signUpError} updateSignUpUsername={updateSignUpUsername} updateSignUpPassword={updateSignUpPassword} updateSignUpEmail={updateSignUpEmail} submitSignUp={submitSignUp} isLoggedIn={isLoggedIn}/>}
          />
          <Route path='/admin' component={AdminContainer} />
          <Route path='/about' component={About} />
          <Route path='/terms-of-service' component={ToS} />
          <Route path='/privacy-policy' component={PrivacyPolicy} />
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
