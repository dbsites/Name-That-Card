import React from 'react';
import { connect } from 'react-redux';
import AdminForm from '../components/AdminForm.jsx';
import AdminLogin from '../components/AdminLogin.jsx';
import * as adminActions from '../actions/adminActions';

const mapStateToProps = store => ({
  adminIsLoggedIn: store.adminReducer.adminIsLoggedIn,
  adminUsername: store.adminReducer.adminUsername,
  mediumRules: store.adminReducer.mediumRules,
  hardRules: store.adminReducer.hardRules,
  newMediumRule: store.adminReducer.newMediumRule,
  newHardRule: store.adminReducer.newHardRule,
  primaryFont: store.adminReducer.primaryFont,
  secondaryFont: store.adminReducer.secondaryFont,
  gameSkin: store.adminReducer.gameSkin,
  gameIcon: store.adminReducer.gameIcon,
  gameName: store.adminReducer.gameName,
  csvData: store.adminReducer.csvData,
  gameSaveStatusMsg: store.adminReducer.gameSaveStatusMsg,
});

const mapDispatchToProps = dispatch => ({
  updateAdminLoginUsername: (event) => {
    dispatch(adminActions.updateAdminLoginUsername(event));
  },
  updateAdminLoginPassword: (event) => {
    dispatch(adminActions.updateAdminLoginPassword(event));
  },
  submitAdminLogin: () => {
    dispatch(adminActions.submitAdminLogin());
  },
  addMediumRuleCategory: (event) => {
    dispatch(adminActions.addMediumRuleCategory(event));
  },
  addHardRuleCategory: (event) => {
    dispatch(adminActions.addHardRuleCategory(event));
  },
  updateNewMediumRule: (event) => {
    dispatch(adminActions.updateNewMediumRule(event));
  },
  updateNewHardRule: (event) => {
    dispatch(adminActions.updateNewHardRule(event));
  },
  removeRuleFromCategory: (info) => {
    dispatch(adminActions.removeRuleFromCategory(info));
  },
  handleIconUpload: (event) => {
    dispatch(adminActions.handleIconUpload(event));
  },
  handleSkinUpload: (event) => {
    dispatch(adminActions.handleSkinUpload(event));
  },
  updatePrimaryFont: (event) => {
    dispatch(adminActions.updatePrimaryFont(event));
  },
  updateSecondaryFont: (event) => {
    dispatch(adminActions.updateSecondaryFont(event));
  },
  updateGameName: (event) => {
    dispatch(adminActions.updateGameName(event));
  },
  handleCsvUpload: (event) => {
    dispatch(adminActions.handleCsvUpload(event));
  },
  submitAdminForm: (event) => {
    dispatch(adminActions.submitAdminForm(event));
  },
  resetAdminForm: () => {
    dispatch(adminActions.resetAdminForm());
  },
});

const AdminContainer = (props) => {
  const { csvData, resetAdminForm,gameSaveStatusMsg, submitAdminForm, handleCsvUpload, gameIcon, gameSkin, removeRuleFromCategory, adminUsername, primaryFont, secondaryFont, updateAdminLoginUsername, updateAdminLoginPassword, adminIsLoggedIn, submitAdminLogin, mediumRules, hardRules, addMediumRuleCategory, addHardRuleCategory, newMediumRule, newHardRule, updateNewMediumRule, updateNewHardRule,handleSkinUpload, handleIconUpload, updatePrimaryFont, updateSecondaryFont, updateGameName, gameName } = props;

  let renderItem = <AdminLogin submitAdminLogin={submitAdminLogin} updateAdminLoginUsername={updateAdminLoginUsername} updateAdminLoginPassword={updateAdminLoginPassword} />;

  if (adminIsLoggedIn) {
    renderItem = <AdminForm resetAdminForm={resetAdminForm} gameSaveStatusMsg={gameSaveStatusMsg} csvData={csvData} submitAdminForm={submitAdminForm} handleCsvUpload={handleCsvUpload} gameName={gameName} updateGameName={updateGameName} updatePrimaryFont={updatePrimaryFont} updateSecondaryFont={updateSecondaryFont} handleSkinUpload={handleSkinUpload} handleIconUpload={handleIconUpload} gameSkin={gameSkin} gameIcon={gameIcon} newHardRule={newHardRule} newMediumRule={newHardRule} removeRuleFromCategory={removeRuleFromCategory} primaryFont={primaryFont} secondaryFont={secondaryFont} newMediumRule={newMediumRule} newHardRule={newHardRule} mediumRules={mediumRules} hardRules={hardRules} addHardRuleCategory={addHardRuleCategory} addMediumRuleCategory={addMediumRuleCategory} updateNewMediumRule={updateNewMediumRule} updateNewHardRule={updateNewHardRule} />;
  }

  return (
    <div>
      {renderItem}
    </div>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);
