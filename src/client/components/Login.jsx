import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

class Login extends Component {
  componentDidMount() {
    const { resetLoginInfo } = this.props
    resetLoginInfo();
  }
  
  render() {
    const { updateLoginEmail, updateLoginPassword, submitLogin, isLoggedIn, loginInputEmail, loginInputPassword } = this.props;

    const loginInfoObj = {
      email_address: loginInputEmail,
      password: loginInputPassword,
    };

    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    const forgotPassword = <span className=""><NavLink to="/password">Forgot Password?</NavLink></span>;

    return (
      <div className="MainContainer">
        <div className="grid">
          <h1>Login</h1>
          <form className="form login">
            <div className="form__field">
              <span className="hidden">Email</span>
              <input id="login__email" type="email" name="email" className="form__input" placeholder="Email" autoCorrect="off" onChange={updateLoginEmail} required />
            </div>
            <div className="form__field">
              <span className="hidden">Password</span>
              <input id="login__password" type="password" name="password" className="form__input" placeholder="Password" onChange={updateLoginPassword} required />
            </div>
            <div className="text--center">
              {forgotPassword}
            </div>
            <div className="form__field">
              <input type="button" onClick={() => submitLogin(loginInfoObj)} value="Login" />
            </div>
          </form>
          <p className="text--center">Want to join the leaderboard? <a href="#">Sign up now</a></p>
        </div>
      </div>
    );
  };
}

export default Login;
