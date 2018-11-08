import React from 'react';

const AdminLogin = (props) => {
  const { updateAdminLoginUsername, updateAdminLoginPassword, submitAdminLogin, adminUsername, adminPassword } = props;

  const adminInfo = {
    username: adminUsername,
    password: adminPassword,
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form>
        <div>
          <label><span>Username</span></label>
          <input placeholder="Username" onChange={updateAdminLoginUsername} required />
        </div>
        <div>
          <label><span>Password</span></label>
          <input placeholder="Password" onChange={updateAdminLoginPassword} required />
        </div>
        <div type="button" onClick={() => submitAdminLogin(adminInfo)}>Login</div>
      </form>
    </div>
  );
};

export default AdminLogin;
