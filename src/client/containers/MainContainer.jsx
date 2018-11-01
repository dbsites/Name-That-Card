import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderContainer from './HeaderContainer.jsx';
import GameListContainer from './GameListContainer.jsx';
import GameMenuContainer from './GameMenuContainer.jsx';
import GameContainer from './GameContainer.jsx';
import FooterContainer from './FooterContainer.jsx';

const mapStateToProps = store => ({
  appLocation: store.mainReducer.appLocation,
});

const mapDispatchToProps = dispatch => ({

});

class MainContainer extends Component {
  render() {
    console.log('props ', this.props)    
    //let appLocation = 'home'
    // conditional logic to render appropriate container
    let primaryContainer = <GameListContainer />;

    if (window.location.pathname === '/') {
      primaryContainer = <GameListContainer />
    } else if (window.location.pathname === '/gameMenu') {
      primaryContainer = <GameMenuContainer />
    } else if (window.location.pathname = '/game') {
      primaryContainer = <GameContainer />
    }
    return (
      <div className="MainContainer" >
        {primaryContainer}
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(MainContainer);
