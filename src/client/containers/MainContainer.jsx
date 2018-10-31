import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderContainer from './HeaderContainer.jsx';
import GameListContainer from './GameListContainer.jsx';
import GameMenuContainer from './GameMenuContainer.jsx';
import GameContainer from './GameContainer.jsx';
import FooterContainer from './FooterContainer.jsx';

// const mapStateToProps = store => ({

// });

// const mapDispatchToProps = dispatch => ({

// });

class MainContainer extends Component {
  render() {
    let appLocation = 'gameMenu';
  
    // conditional logic to render appropriate container
    let primaryContainer = <GameListContainer />;

    //const { appLocation } = this.props;
    
    if (appLocation === 'home') {
      primaryContainer = <GameListContainer />

    } else if (appLocation === 'gameMenu') {
      primaryContainer = <GameMenuContainer />
    } else if (appLocation = 'game') {
      primaryContainer = <GameContainer />
    }
    return (
      <div className="MainContainer" >
        {primaryContainer}
      </div>
    );
  }
}


export default connect(/*mapStateToProps, mapDispatchToProps*/)(MainContainer);
