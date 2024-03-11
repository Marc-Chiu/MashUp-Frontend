import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const SignUp = () => {
  console.log("i got here");
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform sign-up logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="login-container"> {/* Add container class */}
      <img src="/images/MashUpLogo_V3.png" alt="Logo" className="login-image" /> {/* Add logo/image */}
      <div className="login-form">
        <h1 className ="login-text"> Sign Up </h1>
        <form onSubmit={handleSubmit}>
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
          <br />
          <button type="submit">Sign up</button>
        </form>
        <p className="Login-register"> Already Registered? <Link className="Login-register2" to="/"> Login </Link></p>
      </div>
    </div>
  );
};


export default SignUp;