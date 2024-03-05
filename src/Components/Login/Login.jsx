import React, { useState } from 'react';
//import React, { useEffect, useState } from 'react';
import axios from 'axios';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
//import SignUp from '../SignUp';

const LOGIN_ENPOINT = `${BACKEND_URL}/users/byname`;

function ErrorMessage({ message }) {
  return (
    <div className="error-message">
      {message}
    </div>
  );
}
ErrorMessage.propTypes = {
  message: propTypes.string.isRequired,
};

const Login = ({onLogin}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const setCookies = (data) => {
    //console.log(data)
    if(data.username === username && data.password === password){
      onLogin(data);
    } else {
      console.log("setting error")
      setError('No user found with that username and password. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.get(`${LOGIN_ENPOINT}/${username}`)
      .then(({ data }) => setCookies(data))
      .catch(() => setError('No user found with that username. Please try again.'));

  };

  return (
    <div className="login-container"> {/* Add container class */}
      <img src="/images/MashUpLogo_V3.png" alt="Logo" className="login-image" /> {/* Add logo/image */}
      <div className="login-form">
        <h1 className ="login-text">Login </h1>
        <form onSubmit={handleSubmit}>
          <label>Username:</label>
          <input type="username" value={username} onChange={handleUsernameChange} />
          <br />
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} />
          <br />
          <button type="submit">Login</button>
        </form>
        <p className="Login-register"> Not Registered? <Link className="Login-register2" to="/SignUp"> Sign up</Link></p>
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
};

Login.propTypes = {
  onLogin: propTypes.func.isRequired,
};

export default Login;
