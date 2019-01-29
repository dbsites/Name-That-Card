import React from 'react';

const AdminLogin = (props) => {
  const { updateAdminLoginUsername, updateAdminLoginPassword, submitAdminLogin, adminUsername, adminPassword } = props;

  const adminInfo = {
    admin_username: adminUsername,
    password: adminPassword,
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form>
        <div>
          <label>Username</label>
          <input className="adminInput" placeholder="Username" value={adminUsername} onChange={updateAdminLoginUsername} required /> 
        </div>
        <br />
        <div>
          <label>Password</label>
          <input type="Password" className="adminInput" placeholder="Password" value={adminPassword} onChange={updateAdminLoginPassword} required />
        </div>
        <br />
        <div type="button" onClick={() => submitAdminLogin(adminInfo)}>Login</div>
      </form>
    </div>
  );
};

export default AdminLogin;
