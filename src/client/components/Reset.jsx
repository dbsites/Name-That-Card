import React from 'react';

const Reset = (props) => {

  const { firstNewPassword, secondNewPassword, updateFirstNewPassword, updateSecondNewPassword, setNewPasswordErrors, newPasswordStatusMsg, resetPassword } = props;
  const token = window.location.pathname;
  console.log('token in reset ', token)
  const newPasswordObj = {
    new_password: firstNewPassword,
    user_token: token,
  }

  let submitPwFunc = resetPassword;
  if (firstNewPassword !== secondNewPassword || firstNewPassword.length < 5 || secondNewPassword.length < 5) {
    submitPwFunc = setNewPasswordErrors;
  }

  return (
    <div className="HomescreenContainer">
      <div className="grid">
        <h1>Reset Password</h1>
        <form className="form login">
          <div>Enter New Password</div>
          <div className="form__field">
            <input id="login__password" type="password" name="password" className="form__input" value={firstNewPassword} placeholder="Password" autoCorrect="off" onChange={updateFirstNewPassword} required />
          </div>
          <div>Re-Enter New Password</div>
          <div className="form__field">
            <input id="login__password" type="password" name="password" className="form__input" value={secondNewPassword} placeholder="Password" autoCorrect="off" onChange={updateSecondNewPassword} required />
          </div>
          <span>{newPasswordStatusMsg}</span>
        </form>
        <div className="form__field">
          <input type="button" onClick={() => submitPwFunc(newPasswordObj)} value="Reset Password" />
        </div>
      </div>
    </div>
  );
};

export default Reset;