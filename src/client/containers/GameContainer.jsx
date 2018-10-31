import React, { Component } from 'react';
import { connect } from 'react-redux';

// const mapStateToProps = store => ({

// });

// const mapDispatchToProps = dispatch => ({

// });

class GameContainer extends Component {
  render() {
    return (
      <div className="GameContainer" >
        <h4>Game Container</h4>
        <button type="button">NEXT</button>
      </div>
    );
  }
}


export default connect(/*mapStateToProps, mapDispatchToProps*/)(GameContainer);
