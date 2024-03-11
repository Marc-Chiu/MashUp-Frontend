import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import { BACKEND_URL } from '../../constants';

const SIGNUP_ENDPOINT = `${BACKEND_URL}/users`;

function SignUpForm({ setError, fetchUsers }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUserName(event.target.value);
  };
  const handlePasswordChange  = (event) => {
    setPassword(event.target.value);
  };

  const addUser = (event) => {
    event.preventDefault();
    axios.post(SIGNUP_ENDPOINT, { username: username, password: password}) // actual attribute name: this file's var/val
      .then(() => {
        setError('');
        fetchUsers();
      })
      .catch((e) => {
        if(e.response && e.response.data && e.response.data.message) {
            setError(e.response.data.message);
        } else{
            setError('There was a problem adding a user');
        }
      });
  };

SignUpForm.propTypes = {
  setError: propTypes.string.isRequired,
  fetchUsers: propTypes.func.isRequired,
};

return (
  <div className="login-container"> {/* Add container class */}
    <img src="/images/MashUpLogo_V3.png" alt="Logo" className="login-image" /> {/* Add logo/image */}
    <div className="login-form">
      <h1 className ="login-text"> Sign Up </h1>
      <form>
        <label>Username:</label>
        <input type="email" value={username} onChange={handleUsernameChange} />
        <br />
        <label>Password:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
        <br />
        <button type="submit" onClick={addUser}>Sign up</button>
      </form>
      <p className="Login-register"> Already Registered? <Link className="Login-register2" to="/"> Login </Link></p>
    </div>
  </div>
);
}

function SignUp() {

  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    console.log("fetching data")
    axios.get(SIGNUP_ENDPOINT)
    .then((response) => {
      const usersObject = response.data.Data;
      const keys = Object.keys(usersObject);
      const usersArray = keys.map((key) => usersObject[key]);
      setUsers(usersArray);
      console.log(response.data.Data)
      console.log("fetching data")
    }) // something good
    .catch((e) => {
      if (e.response && e.response.data && e.response.data.message) {
        setError(e.response.data.message);
      } else {
        setError('There was a problem fetching all users.');
      }
    });
  };

  useEffect(
    fetchUsers,
    [],
  );

  return (
    <div>
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      <SignUpForm setError={setError} fetchUsers={fetchUsers} />
      {users.map((user) => (
        <div key={user.username} className="user-container"></div>
      ))}
    </div>
  );
}

export default SignUp;