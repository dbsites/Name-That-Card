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
  selectedGame: store.gameListReducer.selectedGame
});

const mapDispatchToProps = dispatch => ({

});
class App extends Component {
  render() {
    const { selectedGame } = this.props;
    console.log('selectedGame ', selectedGame)
    
    return(
      <BrowserRouter>
        <div>
          <Navigation selectedGame={selectedGame}/>
          <Switch>
            <Route path='/' component={MainContainer} exact/>
            <Route path='/gameMenu' component={GameMenuContainer} />
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>
          </Switch>
          <FooterContainer />
        </div>
      </BrowserRouter>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
