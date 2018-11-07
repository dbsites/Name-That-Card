import React from 'react';

const Signup = (props) =>  {
  const { updateSignUpUsername, updateSignUpPassword, updateSignUpEmail, submitSignUp, signUpInputUsername, signUpInputPassword, signUpInputEmail, signUpError, signUpErrorMsg } = props;

  const signUpInfoObj = {
    username: signUpInputUsername,
    email: signUpInputEmail,
    password: signUpInputPassword,
  };

  let errorText = '';
  if (signUpError) {
    errorText = <span>{signUpErrorMsg}</span>;
  }

  return (
    <div className="grid">
      <h1>Sign Up</h1>
      <form class="form login">
        <div class="form__field">
          <label for="signup_username"><svg class="icon"></svg><span class="hidden">Username</span></label>
          <input id="signup_username" type="text" name="username" class="form__input" placeholder="Username" onChange={updateSignUpUsername} required />
        </div>
        <div class="form__field">
          <label for="signup_password"><svg class="icon"></svg><span class="hidden">Password</span></label>
          <input id="signup_username" type="password" name="password" class="form__input" placeholder="Password" onChange={updateSignUpPassword} required />
        </div>
        <div class="form__field">
          <label for="signup_email"><svg class="icon"></svg><span class="hidden">Email</span></label>
          <input id="signup_username" type="text" name="email" class="form__input" placeholder="Email" onChange={updateSignUpEmail} required />
        </div>
        <div class="form__field">
          <input type="submit" onClick={() => submitSignUp(signUpInfoObj)} value="Sign Up" />
        </div>
        <div>
          {errorText}
        </div>
      </form>
    </div>
  );
};

export default Signup;
