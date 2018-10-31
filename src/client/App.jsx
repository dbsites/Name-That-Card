import React,{ Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MainContainer from './containers/MainContainer.jsx';
import Navigation from './components/Navigation.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import FooterContainer from './containers/FooterContainer.jsx';

class App extends Component {

  render() {
    return(
      <BrowserRouter>
        <div>
          <Navigation />
          <Switch>
            <Route path='/' component={MainContainer} exact/>
            <Route path='/login' component={Login}/>
            <Route path='/signup' component={Signup}/>
          </Switch>
          <FooterContainer />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;