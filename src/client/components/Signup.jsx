import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
  componentDidMount() {
    const { resetSignUpInfo, resetLeaderboardLoadingContent, resetRenderScoreFooter } = this.props;
    resetSignUpInfo();
    resetLeaderboardLoadingContent();
    resetRenderScoreFooter();
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
      const selectedGameRoute = `/gameMenu/${selectedGame}`
      return <Redirect to={selectedGameRoute} />;
    } else if (isLoggedIn) {
      return <Redirect to='/'/>;
    }

    let submitFunc = submitSignUp;
    if (signUpInputUsername === '' || !signUpInputEmail.split('').includes('@') || !signUpInputEmail.split('').includes('.') || signUpInputPassword.length < 5) {
      submitFunc = setSignUpCredentialErrors;
    }

  return (
    <div className="HomescreenContainer">
      <div className="grid">
        <h1>Sign Up</h1>
        <form className="form login">
          <div className="form__field">
            <span className="hidden">Username</span>
            <input id="signup_username" type="text" name="username" className="form__input" value={signUpInputUsername} placeholder="Username" onChange={updateSignUpUsername} required />
          </div>
            <span>{usernameErrorMsg}</span> 
          <div className="form__field">
            <span className="hidden">Password</span>
            <input id="signup_username" type="password" name="password" className="form__input" value={signUpInputPassword} placeholder="Password" onChange={updateSignUpPassword} required />
          </div>
            <span>{passwordErrorMsg}</span> 
          <div className="form__field">
            <span className="hidden">Email</span>
            <input id="signup_username" type="text" name="email" className="form__input" value={signUpInputEmail} placeholder="Email" onChange={updateSignUpEmail} required />
          </div>
            <span>{emailErrorMsg}</span>
          <div className="form__field">
            <input type="button" onClick={() => submitFunc(signUpInfoObj)} value="Sign Up" />
          </div>
          <div>
            {errorText}
          </div>
        </form>
      </div>
    </div>
    );
  };
}

export default Signup;
