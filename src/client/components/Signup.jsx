import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Signup extends Component {
  componentDidMount() {
    const { resetSignUpInfo } = this.props;
    resetSignUpInfo();
  }

  render() {
    const { updateSignUpUsername, updateSignUpPassword, updateSignUpEmail, submitSignUp, signUpInputUsername, signUpInputPassword, signUpInputEmail, signUpError, signUpErrorMsg, isLoggedIn, selectedGame } = this.props;

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

  return (
    <div className="HomescreenContainer">
      <div className="grid">
        <h1>Sign Up</h1>
        <form className="form login">
          <div className="form__field">
            <span className="hidden">Username</span>
            <input id="signup_username" type="text" name="username" className="form__input" value={signUpInputUsername} placeholder="Username" onChange={updateSignUpUsername} required />
          </div>
          <div className="form__field">
            <span className="hidden">Password</span>
            <input id="signup_username" type="password" name="password" className="form__input" value={signUpInputPassword} placeholder="Password" onChange={updateSignUpPassword} required />
          </div>
          <div className="form__field">
            <span className="hidden">Email</span>
            <input id="signup_username" type="text" name="email" className="form__input" value={signUpInputEmail} placeholder="Email" onChange={updateSignUpEmail} required />
          </div>
          <div className="form__field">
            <input type="button" onClick={() => submitSignUp(signUpInfoObj)} value="Sign Up" />
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
