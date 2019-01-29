import React, { Component } from 'react';

class Forgot extends Component {
  componentDidMount() {
    const { resetNewPasswordEmailInputs } = this.props;
    resetNewPasswordEmailInputs();
  }

  render() {
    const { forgotInputEmail, updateForgotInputEmail, sendResetPwEmail, emailStatusMsg, emailSuccess } = this.props;
    const forgotInfoObj = {
      email_address: forgotInputEmail,
    };

    return (
      <div className="UserContainer">
        <div className="grid">
          <h1>Reset Password</h1>
          <div>Enter Account Email Address</div>
          <form className="form login">
            <div className="form__field">
              <input id="login__email" type="email" name="email" className="form__input" value={forgotInputEmail} placeholder="Email" autoCorrect="off" onChange={updateForgotInputEmail} required />
            </div>
            <div className="form__field">
              <input type="button" onClick={() => sendResetPwEmail(forgotInfoObj)} value="Send Email" />
            </div>
          </form>
          <span>{emailStatusMsg}</span>
        </div>
      </div>
    );
  }
}

export default Forgot;
