import React, { Component } from 'react';
import { connect } from 'react-redux';

// const mapStateToProps = store => ({

// });

// const mapDispatchToProps = dispatch => ({

// });

class HeaderContainer extends Component {
  render() {
    return (
      <div className="HeaderContainer" >
        <h1>Header Container</h1>
      </div>
    );
  }
}


export default connect(/*mapStateToProps, mapDispatchToProps*/)(HeaderContainer);
