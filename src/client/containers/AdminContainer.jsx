import React from 'react';
import { connect } from 'react-redux';
import AdminForm from '../components/AdminForm.jsx';
import AdminLogin from '../components/AdminLogin.jsx';
import * as adminActions from '../actions/adminActions';

const mapStateToProps = store => ({
  adminIsLoggedIn: store.adminReducer.adminIsLoggedIn,
  mediumRules: store.adminReducer.mediumRules,
  hardRules: store.adminReducer.hardRules,
  newMediumRule: store.adminReducer.newMediumRule,
  newHardRule: store.adminReducer.newHardRule,

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
});

const AdminContainer = (props) => {
  const { updateAdminLoginUsername, updateAdminLoginPassword, adminIsLoggedIn, submitAdminLogin, mediumRules, hardRules, addMediumRuleCategory, addHardRuleCategory, newMediumRule, newHardRule, updateNewMediumRule, updateNewHardRule } = props;
  let renderItem = <AdminLogin submitAdminLogin={submitAdminLogin} updateAdminLoginUsername={updateAdminLoginUsername} updateAdminLoginPassword={updateAdminLoginPassword} />;
  if (adminIsLoggedIn) {
    renderItem = <AdminForm newMediumRule={newMediumRule} newHardRule={newHardRule} mediumRules={mediumRules} hardRules={hardRules} addHardRuleCategory={addHardRuleCategory} addMediumRuleCategory={addMediumRuleCategory} updateNewMediumRule={updateNewMediumRule} updateNewHardRule={updateNewHardRule} />;
  }
  return (
    <div>
      {renderItem}
    </div>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);
