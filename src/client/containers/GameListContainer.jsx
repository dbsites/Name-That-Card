import React, { Component } from 'react';
import { connect } from 'react-redux';

// const mapStateToProps = store => ({

// });

// const mapDispatchToProps = dispatch => ({

// });

class GameListContainer extends Component {
  render() {
    return (
      <div className="GameListContainer" >
        <h2>Game List Container</h2>
        <button type="button">NEXT</button>
      </div>
    );
  }
}


export default connect(/*mapStateToProps, mapDispatchToProps*/)(GameListContainer);
