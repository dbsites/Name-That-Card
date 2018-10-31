import React, { Component } from 'react';
import { connect } from 'react-redux';

// const mapStateToProps = store => ({

// });

// const mapDispatchToProps = dispatch => ({

// });

class FooterContainer extends Component {
  render() {
    return (
      <div className="FooterContainer" >
        <h1>Footer Container</h1>
      </div>
    );
  }
}


export default connect(/*mapStateToProps, mapDispatchToProps*/)(FooterContainer);
