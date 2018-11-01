import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import GameMenuContainer from './containers/GameMenuContainer.jsx';
import Navigation from './components/Navigation.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Footer from './components/Footer.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import ToS from './components/ToS.jsx';
import About from './components/About.jsx';
import * as actions from './actions/actions';

const mapStateToProps = store => ({
  isLoggedIn: store.userReducer.isLoggedIn,
  selectedGame: store.gameListReducer.selectedGame,
  signUpError: store.userReducer.signUpError,
});

const mapDispatchToProps = dispatch => ({
  updateSignUpUsername: (event) => {
    dispatch(actions.updateSignUpUsername(event));
  },
  updateSignUpPassword: (event) => {
    dispatch(actions.updateSignUpPassword(event));
  },
  updateSignUpEmail: (event) => {
    dispatch(actions.updateSignUpEmail(event));
  },
  submitSignUp: (obj) => {
    dispatch(actions.submitSignUp(obj));
  },
  updateLoginUsername: (event) => {
    dispatch(actions.updateLoginUsername(event));
  },
  updateLoginPassword: (event) => {
    dispatch(actions.updateLoginPassword(event));
  },
  submitLogin: () => {
    dispatch(actions.submitLogin());
  },
});

const App = (props) => {
  const { selectedGame, updateSignUpUsername, updateSignUpPassword, updateSignUpEmail, submitSignUp, updateLoginUsername, updateLoginPassword, submitLogin, isLoggedIn, signUpError } = props;
  console.log('selectedGame ', selectedGame);

  return (
    <BrowserRouter>
      <div>
        <Navigation selectedGame={selectedGame} />
        <Switch>
          <Route path='/' component={MainContainer} exact />
          <Route path='/gameMenu' component={GameMenuContainer} />
          <Route path='/login' render={(props) =>
              <Login {...props} updateLoginUsername={updateLoginUsername} updateLoginPassword={updateLoginPassword} submitLogin={submitLogin} isLoggedIn={isLoggedIn} />} />
          <Route path='/signup' 
            render={(props) => <Signup {...props} signUpError={signUpError} updateSignUpUsername={updateSignUpUsername} updateSignUpPassword={updateSignUpPassword} updateSignUpEmail={updateSignUpEmail} submitSignUp={submitSignUp}/>}
          />
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
