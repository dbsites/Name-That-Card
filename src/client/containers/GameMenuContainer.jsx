import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStateToProps = store => ({
  categoryList: store.gameMenuReducer.categoryList,
});

const mapDispatchToProps = dispatch => ({

});

class GameMenuContainer extends Component {
  render() {
    const { categoryList } = this.props;
    console.log(' GameMenuContainer -> render -> categoryList', categoryList);

    const divStyle = {
      display: 'flex',
      margin: '20px',
      border: '5px solid pink',
      justifyContent: 'center'
    };

    let categories = categoryList.map((gameCatObj) => {
      let category = gameCatObj.game_category;
      return(
        <div style={divStyle} >{category}</div>
      )
    })
    return (
      <div className="GameMenuContainer" >
        <h3>Game Menu Container</h3>
          {categories}           
        <div style={divStyle} >
          <div style={divStyle} >EASY</div>
          <div style={divStyle} >MED.</div>
          <div style={divStyle} >HARD</div>
        </div>
        <button type="button">START</button>
      </div>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GameMenuContainer);
