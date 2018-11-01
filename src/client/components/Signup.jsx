import React, {Component} from 'react';

const Signup = (props) =>  {
  const { updateSignUpUsername, updateSignUpPassword, updateSignUpEmail, submitSignUp, signUpInputUsername, signUpInputPassword, signUpInputEmail } = props;
  const signUpInfoObj = {
    signUpInputUsername,
    signUpInputEmail,
    signUpInputPassword
  }
  return (
    <div className="SignUpContainer">
      <h1>Sign Up</h1>
      <p className="SignUpText">Username: </p>
      <input id="username" className="SignUpInput" type="text" onChange={updateSignUpUsername}/>
      <p className="SignUpText">Password: </p>
      <input id="password" className="SignUpInput" type="password" onChange={updateSignUpPassword}/>
      <p className="SignUpText">Email: </p>
      <input id="email" className="SignUpInput" onChange={updateSignUpEmail}/>
      <br />
      <br />
      <button className="SignUpButton" onClick={() => submitSignUp(signUpInfoObj)}>Sign up</button>
    </div>
  )
}


export default Signup;
