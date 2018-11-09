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
    <div className="MainContainer">
      <div className="grid">
        <h1>Login</h1>
        <form className="form login">
          <div className="form__field">
            <label htmlFor="login__email"><svg className="icon"></svg><span className="hidden">Email</span></label>
            <input id="login__email" type="email" name="email" className="form__input" placeholder="Email" autoCorrect="off" onChange={updateLoginEmail} required />
          </div>
          <div className="form__field">
            <label htmlFor="login__password"><svg className="icon"></svg><span className="hidden">Password</span></label>
            <input id="login__password" type="password" name="password" className="form__input" placeholder="Password" onChange={updateLoginPassword} required />
          </div>

          {/* <p className="loginText">Email: </p>
          <input id="email" className="loginInput" type="text" onChange={updateLoginEmail} /> */}
          {/* <p className="loginText">Password: </p>
          <input id="password" className="loginInput" type="password" onChange={updateLoginPassword} /> */}
          <div className="text--center">
            {forgotPassword}
          </div>
          <div className="form__field">
            <input type="button" onClick={() => submitLogin(loginInfoObj)} value="Login" />
          </div>
        </form>
        <p className="text--center">Want to join the leaderboard? <a href="#">Sign up now</a> <svg className="icon"></svg></p>
        {/* <button className="loginButton" onClick={() => submitLogin(loginInfoObj)} >Login</button> */}
      </div>
    </div>
  );
};

export default Login;
