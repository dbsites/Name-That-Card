import React, { Component } from 'react';
import { NavLink, Redirect } from 'react-router-dom';

class Forgot extends Component {
  componentDidMount() {

  }
  
  render() {
    const { forgotInputEmail, updateForgotInputEmail } = this.props;

    const forgotInfoObj = {
      email: forgotInputEmail,
    };

    // let errorMsg = ''

    // if (isLoggedIn & selectedGame !== '') {
    //   const selectedGameRoute = `/gameMenu/${selectedGame}`
    //   return <Redirect to={selectedGameRoute} />;
    // } else if (isLoggedIn) {
    //   return <Redirect to='/'/>;
    // }

    // if (loginError) {
    //   errorMsg = <span>{loginErrorMsg}</span>; 
    // }

    return (
      <div className="HomescreenContainer">
        <div className="grid">
          <h1>Reset Password</h1>
          <form className="form login">
            <div >Enter Account Email Address</div>
            <div className="form__field">
              <input id="login__email" type="email" name="email" className="form__input" value={forgotInputEmail} placeholder="Email" autoCorrect="off" onChange={updateForgotInputEmail} required />
            </div>
          </form>
          {/* <div>
            {errorMsg}
          </div> */}
          <div className="form__field">
            <input type="button" onClick={() => sendResetPwEmail(forgotInfoObj)} value="Send Email" />
          </div>
        </div>
      </div>
    );
  };
}

export default Forgot;