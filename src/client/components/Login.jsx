import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';

const Login = (props) => {
  const { updateLoginEmail, updateLoginPassword, submitLogin, isLoggedIn, loginInputEmail, loginInputPassword } = props;

  const loginInfoObj = {
    email_address: loginInputEmail,
    password: loginInputPassword,
  };

  if (isLoggedIn) {
    return <Redirect to="/" />; // todo: recognize user identity
  }

  const forgotPassword = <span className=""><NavLink to="/password">Forgot Password</NavLink></span>;

  return (
    <div className="grid">
      <h1>Login</h1>
      <form class="form login">
        <div class="form__field">
          <label for="login__email"><svg class="icon"></svg><span class="hidden">Email</span></label>
          <input id="login__email" type="email" name="email" class="form__input" placeholder="Email" autocorrect="off" onChange={updateLoginEmail} required />
        </div>
        <div class="form__field">
          <label for="login__password"><svg class="icon"></svg><span class="hidden">Password</span></label>
          <input id="login__password" type="password" name="password" class="form__input" placeholder="Password" onChange={updateLoginPassword} required />
        </div>

        {/* <p className="loginText">Email: </p>
        <input id="email" className="loginInput" type="text" onChange={updateLoginEmail} /> */}
        {/* <p className="loginText">Password: </p>
        <input id="password" className="loginInput" type="password" onChange={updateLoginPassword} /> */}
        <div class="text--center">
          {forgotPassword}
        </div>
        <div class="form__field">
          <input type="button" onClick={() => submitLogin(loginInfoObj)} value="Login" />
        </div>
      </form>
      <p class="text--center">Want to join the leaderboard? <a href="#">Sign up now</a> <svg class="icon"></svg></p>
      {/* <button className="loginButton" onClick={() => submitLogin(loginInfoObj)} >Login</button> */}
    </div>
  );
};

export default Login;
