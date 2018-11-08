import React from 'react';
import MediumRule from './MediumRule.jsx';
import HardRule from './HardRule.jsx';

const AdminForm = (props) => {
  const { handleIconUpload, handleSkinUpload, updatePrimaryFont, updateSecondaryFont, addMediumRuleCategory, addHardRuleCategory, mediumRules, hardRules, newHardRule, newMediumRule, updateNewMediumRule, updateNewHardRule } = props;
  // const adminInfo = {

  // }

  const mediumRulesList = mediumRules.map((cat) => {
    return <MediumRule category={cat} />
  })

  const hardRulesList = hardRules.map((cat) => {
    return <HardRule category={cat} />
  })

  return (
    <div>
      <h1>New Game Content</h1>
      <form>
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
          <label>Enter Google Font (primary font)</label>  <br/>
          <input placeholder="Primary Font" onChange={updatePrimaryFont} />
        </div>
         <br/>
        <div>
          <label>Enter Google Font (secondary font)</label>  <br/>
          <input placeholder="Secondary Font" onChange={updateSecondaryFont} />
        </div>
         <br/>
        <div> 
          <label>Enter Rules (categories) for Medium Difficulty</label> <br/>
          <span>*category entered must match category in CSV*</span>  <br/>
          <input placeholder="Enter Category" onChange={updateNewMediumRule}/><br/>
          <button type="button" onClick={() => addMediumRuleCategory(newMediumRule)} >Click to Submit Category</button>
          <ul>
            {mediumRulesList}
          </ul>
        </div>
        <div>
          <label>Enter Rules (categories) for Hard Difficulty</label> <br/>
          <span>*category entered must match category in CSV*</span>  <br/>
          <input placeholder="Enter Category" onChange={updateNewHardRule} /><br/>
          <button type="button" onClick={() => addHardRuleCategory(newHardRule)} >Click to Submit Category</button>
          <ul>
            {hardRulesList}
          </ul>
        </div>
        <div>
          <label>Upload CSV Data</label>
          <input className="dataInput" type="file" />
        </div>
         <br/>
        <button type="button" onClick={() => submitAdminLogin(adminInfo)}>Submit</button>
      </form>
    </div>  );
};


export default AdminForm;
