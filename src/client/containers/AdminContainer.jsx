import React, { Component } from 'react';
import { connect } from 'react-redux';
import AdminForm from '../components/AdminForm.jsx';
import AdminLogin from '../components/AdminLogin.jsx';
import * as adminActions from '../actions/adminActions';

const mapStateToProps = store => ({
  adminIsLoggedIn: store.adminReducer.adminIsLoggedIn,
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
});

const AdminContainer = (props) => {
  const { updateAdminLoginUsername, updateAdminLoginPassword, adminIsLoggedIn, submitAdminLogin } = props;
  let renderItem = <AdminLogin submitAdminLogin={submitAdminLogin} updateAdminLoginUsername={updateAdminLoginUsername} updateAdminLoginPassword={updateAdminLoginPassword} />;
  if (adminIsLoggedIn) {
    renderItem = <AdminForm />;
  }
  return (
    <div>
      {renderItem}
    </div>
  );
}


export default connect(mapStateToProps, mapDispatchToProps)(AdminContainer);
