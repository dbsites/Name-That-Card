import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

const Login = (props) => {
  const { updateLoginUsername, updateLoginPassword, submitLogin, isLoggedIn } = props;

  if (isLoggedIn) {
    return <Redirect to="/" />;   // todo: recognize user identity
  }

  let forgotPassword = <span className=""><NavLink to="/password">Forgot Password</NavLink></span>

  return(
    <div className="login">
      <h3>Login</h3>
      <p className="loginText">Username: </p>
      <input id="username" className="loginInput" type="text" onChange={updateLoginUsername}/>
      <p className="loginText">Password: </p>
      <input id="password" className="loginInput" type="password" onChange={updateLoginPassword} />
      <br/>
      {forgotPassword}
      <br />
      <br />
      <button className="loginButton" type="button" onClick={submitLogin} >Login</button>
    </div>
  );
}



export default Login;
