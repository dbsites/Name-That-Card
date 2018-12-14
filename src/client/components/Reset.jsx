import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Reset extends Component {
  componentDidMount() {
    const { resetNewPasswordInputs } = this.props;
    resetNewPasswordInputs();
  }
  render() {
    const { firstNewPassword, secondNewPassword, updateFirstNewPassword, updateSecondNewPassword, setNewPasswordErrors, newPasswordStatusMsg, resetPassword, resetNewPasswordInputs, passwordReset } = this.props;
    const token = window.location.pathname.slice(7);
    const newPasswordObj = {
      new_password: firstNewPassword,
      user_token: token,
    }

    let submitPwFunc = resetPassword;
    if (firstNewPassword !== secondNewPassword || firstNewPassword.length < 5 || secondNewPassword.length < 5) {
      submitPwFunc = setNewPasswordErrors;
    }
    if (passwordReset) {
      return <Redirect to='/login' />;
    }

    return (
      <div className="HomescreenContainer">
        <div className="grid">
          <h1>Reset Password</h1>
          <div>Enter New Password</div>
          <form className="form login">
            <div className="form__field">
              <input type="password" name="password" className="form__input" value={firstNewPassword} placeholder="Password" autoCorrect="off" onChange={updateFirstNewPassword} required />
            </div>
          </form>
          <div>Re-Enter New Password</div>
          <form className="form login">
            <div className="form__field">
              <input type="password" name="password" className="form__input" value={secondNewPassword} placeholder="Password" autoCorrect="off" onChange={updateSecondNewPassword} required />
            </div>
            <div className="form__field">
              <input type="button" onClick={() => submitPwFunc(newPasswordObj)} value="Reset Password" />
            </div>
          </form>
          <div>
            <div>{newPasswordStatusMsg}</div>
          </div>
        </div>
      </div>
    );
  };
}

export default Reset;