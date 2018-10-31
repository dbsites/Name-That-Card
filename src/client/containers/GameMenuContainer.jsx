import React, { Component } from 'react';
import { connect } from 'react-redux';

// const mapStateToProps = store => ({

// });

// const mapDispatchToProps = dispatch => ({

// });

class GameMenuContainer extends Component {
  render() {
    return (
      <div className="GameMenuContainer" >
        <h3>Game Menu Container</h3>
        <button type="button">PLAY</button>
      </div>
    );
  }
}


export default connect(/*mapStateToProps, mapDispatchToProps*/)(GameMenuContainer);
