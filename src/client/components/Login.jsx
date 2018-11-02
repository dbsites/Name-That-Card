import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

const Login = (props) => {
  const { updateLoginEmail, updateLoginPassword, submitLogin, isLoggedIn, loginInputEmail, loginInputPassword } = props;

  const loginInfoObj = {
    loginInputEmail,
    loginInputPassword,
  }

  if (isLoggedIn) {
    return <Redirect to="/" />;   // todo: recognize user identity
  }

  let forgotPassword = <span className=""><NavLink to="/password">Forgot Password</NavLink></span>

  return(
    <div className="login">
      <h3>Login</h3>
      <p className="loginText">Email: </p>
      <input id="email" className="loginInput" type="text" onChange={updateLoginEmail}/>
      <p className="loginText">Password: </p>
      <input id="password" className="loginInput" type="password" onChange={updateLoginPassword} />
      <br/>
      {forgotPassword}
      <br />
      <br />
      <button className="loginButton" onClick={() => submitLogin(loginInfoObj)} >Login</button>
    </div>
  );
}

export default Login;
