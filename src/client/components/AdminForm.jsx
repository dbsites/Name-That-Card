import React, { Component } from 'react';
import MediumRule from './MediumRule.jsx';
import HardRule from './HardRule.jsx';

class AdminForm extends Component {
  componendDidMount() {
    const { resetAdminForm } = this.props;
    console.log('in did mount')
    resetAdminForm();
  }
  
  render() {
    const { gameSaveStatusMsg, csvData, gameSkin, gameIcon, removeRuleFromCategory, secondaryFont, primaryFont, handleIconUpload, addMediumRuleCategory, addHardRuleCategory, mediumRules, hardRules, newHardRule, newMediumRule, updateNewMediumRule, updateNewHardRule, handleSkinUpload, updateSecondaryFont, updatePrimaryFont, updateGameName, gameName, handleCsvUpload, submitAdminForm } = this.props;

    const mediumRulesList = mediumRules.map((cat) => {
      return <MediumRule removeRuleFromCategory={removeRuleFromCategory} category={cat} />
    })

    const hardRulesList = hardRules.map((cat) => {
      return <HardRule removeRuleFromCategory={removeRuleFromCategory} category={cat} />
    })

    const gameInfo = {
      gameName,
      primaryFont,
      secondaryFont,
      gameIcon,
      gameSkin,
      csvData,
      mediumRules,
      hardRules,
    }

    const saveMessage = <span>{gameSaveStatusMsg}</span>

    return (
      <div>
        <h1>New Game Content</h1>
        <form>
          <div>
            <label>Enter Game Name ("Edition" will be added to game title e.g "Sports Edition")</label>  <br/>
            <input className="admin_input" placeholder="Game Name" value={gameName} onChange={updateGameName} />
          </div>
          <br/>
          <div>
            <label>Upload Game Icon</label>  <br/>
            <input placeholder="Icon" type="file" onChange={handleIconUpload} />
          </div>
          <br/>
          <div>
            <label>Upload Background Skin </label>  <br/>
            <input placeholder="Background Skin" type="file" onChange={handleSkinUpload} />
          </div>
          <br/>
          <div>
            <label>Enter Google Font (primary font)</label><br/>
            <input className="admin_input" placeholder="Primary Font" value={primaryFont} onChange={updatePrimaryFont} />
          </div>
          <br/>
          <div>
            <label>Enter Google Font (secondary font)</label><br/>
            <input className="admin_input" placeholder="Secondary Font" value={secondaryFont} onChange={updateSecondaryFont} />
          </div>
          <br/>
          <div> 
            <label>Enter Rules (categories) for Medium Difficulty</label> <br/>
            <span>*category entered must match category in CSV - click category to remove*</span>  <br/>
            <input className="admin_input" value={newMediumRule} placeholder="Enter Category" onChange={updateNewMediumRule}/><br/>
            <button type="button" onClick={() => addMediumRuleCategory(newMediumRule)} >Click to Submit Category</button>
            <ul>
              {mediumRulesList}
            </ul>
          </div>
          <div>
            <label>Enter Rules (categories) for Hard Difficulty</label> <br/>
            <span>*category entered must match category in CSV - click category to remove*</span>  <br/>
            <input className="admin_input" value={newHardRule} placeholder="Enter Category" onChange={updateNewHardRule} /><br/>
            <button type="button" onClick={() => addHardRuleCategory(newHardRule)} >Click to Submit Category</button>
            <ul>
              {hardRulesList}
            </ul>
          </div>
          <div>
            <label>Upload CSV Data</label>
            <input placeholder="Icon" type="file" onChange={handleCsvUpload} />
          </div>
          <br/>
          <button type="button" onClick={() => submitAdminForm(gameInfo)}>Submit</button>
        </form>
        <div>
          {saveMessage}
        </div>

      </div>  );
  }
};


export default AdminForm;
