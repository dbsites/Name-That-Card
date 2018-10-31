import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import GameMenuContainer from './containers/GameMenuContainer.jsx';
import Navigation from './components/Navigation.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import FooterContainer from './containers/FooterContainer.jsx';

const mapStateToProps = store => ({
  appLocation: store.appLocation,
  selectedGame: store.selectedGame
});

const mapDispatchToProps = dispatch => ({

});
class App extends Component {

  render() {
    const { appLocation, selectedGame } = this.props;
    
    return(
      <BrowserRouter>
        <div>
          <Navigation appLocation={appLocation} selectedGame={selectedGame}/>
          <Switch>
            <Route path='/' component={MainContainer} exact/>
            <Route path='/gameMenu' component={GameMenuContainer} />
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>
          </Switch>
          <FooterContainer appLocation={appLocation}/>
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
