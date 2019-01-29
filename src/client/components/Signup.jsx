import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

class Signup extends Component {
  componentDidMount() {
    const { resetSignUpInfo, resetLeaderboardLoadingContent, resetRenderScoreFooter, resetFooterBool } = this.props;
    resetSignUpInfo();
    resetLeaderboardLoadingContent();
    resetRenderScoreFooter();
    resetFooterBool();
  }

  render() {
    const { updateSignUpUsername, updateSignUpPassword, updateSignUpEmail, submitSignUp, signUpInputUsername, signUpInputPassword, signUpInputEmail, signUpError, signUpErrorMsg, isLoggedIn, selectedGame, usernameErrorMsg, passwordErrorMsg, emailErrorMsg, setSignUpCredentialErrors } = this.props;

    const signUpInfoObj = {
      username: signUpInputUsername,
      email_address: signUpInputEmail,
      password: signUpInputPassword,
    };

    let errorText = '';
    if (signUpError) {
      errorText = <span>{signUpErrorMsg}</span>;
    }

    if (isLoggedIn & selectedGame !== '') {
      const selectedGameRoute = `/gameMenu/${selectedGame}`;
      return <Redirect to={selectedGameRoute} />;
    } else if (isLoggedIn) {
      return <Redirect to='/' />;
    }

    let submitFunc = submitSignUp;
    if (signUpInputUsername === '' || !signUpInputEmail.split('').includes('@') || !signUpInputEmail.split('').includes('.') || signUpInputPassword.length < 5) {
      submitFunc = setSignUpCredentialErrors;
    }

    return (
      <div className="UserContainer">
        <div className="grid">
          <h1>Sign Up</h1>
          <form className="form login">
            <div className="form__field">
              <span className="hidden">Username</span>
              <input id="signup_username" type="text" name="username" className="form__input" value={signUpInputUsername} placeholder="Username" onChange={updateSignUpUsername} required />
            </div>
            <div className="form__field">
              <span className="hidden">Password</span>
              <input id="signup_password" type="password" name="password" className="form__input" value={signUpInputPassword} placeholder="Password" onChange={updateSignUpPassword} required />
            </div>
            <div className="form__field">
              <span className="hidden">Email</span>
              <input id="signup_email" type="text" name="email" className="form__input" value={signUpInputEmail} placeholder="Email" onChange={updateSignUpEmail} required />
            </div>
            <div className="form__field">
              <input type="button" onClick={() => submitFunc(signUpInfoObj)} value="Sign Up" />
            </div>
            <div>
              <div className="error-text">
                <span>{usernameErrorMsg}</span>
              </div>
              <div className="error-text">
                <span>{passwordErrorMsg}</span>
              </div>
              <div className="error-text">
                <span>{emailErrorMsg}</span>
              </div>
              <div className="error-text">
                {errorText}
              </div>
            </div>
            <div className="text--center">
              <div>Already have an account? <NavLink className="loginSignupLink" to="/login"> Login.</NavLink></div>
            </div>
          </form>
        </div>
      </div>
    );
  };
}

export default Signup;
