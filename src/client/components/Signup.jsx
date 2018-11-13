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
        <form className="form login">
          <div className="form__field">
            <label htmlFor="signup_username"><svg className="icon"></svg><span className="hidden">Username</span></label>
            <input id="signup_username" type="text" name="username" className="form__input" placeholder="Username" onChange={updateSignUpUsername} required />
          </div>
          <div className="form__field">
            <label htmlFor="signup_password"><svg className="icon"></svg><span className="hidden">Password</span></label>
            <input id="signup_username" type="password" name="password" className="form__input" placeholder="Password" onChange={updateSignUpPassword} required />
          </div>
          <div className="form__field">
            <label htmlFor="signup_email"><svg className="icon"></svg><span className="hidden">Email</span></label>
            <input id="signup_username" type="text" name="email" className="form__input" placeholder="Email" onChange={updateSignUpEmail} required />
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

export default Signup;
