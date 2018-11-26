import React, { Component } from 'react';

class Forgot extends Component {
  componentDidMount() {
    const { resetNewPasswordEmailInputs } = this.props;
    resetNewPasswordEmailInputs();
  }
  render() {

    const { forgotInputEmail, updateForgotInputEmail, sendResetPwEmail, emailStatusMsg, emailSuccess } =this.props;

    const forgotInfoObj = {
      email_address: forgotInputEmail,
    };

    return (
      <div className="HomescreenContainer">
        <div className="grid">
          <h1>Reset Password</h1>
          <form className="form login">
            <div >Enter Account Email Address</div>
            <div className="form__field">
              <input id="login__email" type="email" name="email" className="form__input" value={forgotInputEmail} placeholder="Email" autoCorrect="off" onChange={updateForgotInputEmail} required />
            </div>
          </form>
          {/* <div>
            {errorMsg}
          </div> */}
          <div className="form__field">
            <input type="button" onClick={() => sendResetPwEmail(forgotInfoObj)} value="Send Email" />
          </div>
          <span>{emailStatusMsg}</span>
        </div>
      </div>
    );
  }
}

export default Forgot;