import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import GameMenuContainer from './containers/GameMenuContainer.jsx';
import Navigation from './components/Navigation.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import FooterContainer from './containers/FooterContainer.jsx';
import PrivacyPolicy from './components/PrivacyPolicy.jsx';
import ToS from './components/ToS.jsx';
import About from './components/About.jsx';



const mapStateToProps = store => ({
  selectedGame: store.gameListReducer.selectedGame,
});

const mapDispatchToProps = dispatch => ({

});
const App = (props) => {
  const { selectedGame } = props;
  console.log('selectedGame ', selectedGame);

  return (
    <BrowserRouter>
      <div>
        <Navigation selectedGame={selectedGame} />
        <Switch>
          <Route path='/' component={MainContainer} exact />
          <Route path='/gameMenu' component={GameMenuContainer} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={Signup} />
          <Route path='/about' component={About} />
          <Route path='/terms-of-service' component={ToS} />
          <Route path='/privacy-policy' component={PrivacyPolicy} />
        </Switch>
        <FooterContainer />
      </div>
    </BrowserRouter>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
