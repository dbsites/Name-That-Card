import React from 'react';
import { Redirect } from 'react-router-dom';

const Signup = (props) =>  {
  const { updateSignUpUsername, updateSignUpPassword, updateSignUpEmail, submitSignUp, signUpInputUsername, signUpInputPassword, signUpInputEmail, signUpError, signUpErrorMsg, isLoggedIn } = props;

  const signUpInfoObj = {
    username: signUpInputUsername,
    email_address: signUpInputEmail,
    password: signUpInputPassword,
  };

  let errorText = '';
  if (signUpError) {
    errorText = <span>{signUpErrorMsg}</span>;
  }

  if (isLoggedIn) {
    return <Redirect to="/" />; // todo: recognize user identity
  }

  return (
    <div className="MainContainer">
      <div className="grid">
        <h1>Sign Up</h1>
        <form class="form login">
          <div class="form__field">
            <label htmlFor="signup_username"><svg class="icon"></svg><span class="hidden">Username</span></label>
            <input id="signup_username" type="text" name="username" class="form__input" placeholder="Username" onChange={updateSignUpUsername} required />
          </div>
          <div class="form__field">
            <label htmlFor="signup_password"><svg class="icon"></svg><span class="hidden">Password</span></label>
            <input id="signup_username" type="password" name="password" class="form__input" placeholder="Password" onChange={updateSignUpPassword} required />
          </div>
          <div class="form__field">
            <label htmlFor="signup_email"><svg class="icon"></svg><span class="hidden">Email</span></label>
            <input id="signup_username" type="text" name="email" class="form__input" placeholder="Email" onChange={updateSignUpEmail} required />
          </div>
          <div class="form__field">
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

export default Signup;
