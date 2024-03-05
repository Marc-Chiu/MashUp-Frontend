import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';

import { BACKEND_URL } from '../../constants';

const USER_ENDPOINTS = `${BACKEND_URL}/users`;

function AddUserForm({ setError, fetchUsers }) {
	const [username, setUserName] = useState('');
	const [password, setPassword] = useState('');
	// const [dob, setDob] = useState('');
	// const [email, setEmail] = useState('');

	const changeUsername = (event) => { setUserName(event.target.value); };
	const changePassword  = (event) => { setPassword(event.target.value); };
	// const changeDob  = (event) => {  setDob(event.target.value); };
	// const changeEmail  = (event) => {  setEmail(event.target.value); };

	const addUser = (event) => {
		event.preventDefault();
		axios.post(USER_ENDPOINTS, { username: username, password: password}) // actual attribute name: this file's var/val
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

AddUserForm.propTypes = {
	setError: propTypes.string.isRequired,
	fetchUsers: propTypes.func.isRequired,
};

	return (
		<form>
			<label htmlFor="first_name">
				Username
			</label>
			<input type="text" id="first_name" value={username} onChange={changeUsername} />

			<label htmlFor="last_name">
				Password
			</label>
			<input type="text" id="last_name" value={password} onChange={changePassword} />

			{/* <label htmlFor="dob">
				Date of Birth
			</label>
			<input type="text" id="dob" value={dob} onChange={changeDob} />

			<label htmlFor="email">
				Email
			</label>
			<input type="text" id="email" value={email} onChange={changeEmail} /> */}

			<button type="submit" onClick={addUser}>Add User</button>
		</form>
	);
}

function Users() {

	const [error, setError] = useState('');
	const [users, setUsers] = useState([]);

	const fetchUsers = () => {
		console.log("fetching data")
		axios.get(USER_ENDPOINTS)
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
		}); // something bad
	};

	useEffect(
		fetchUsers,
		[],
	);

	return (
		<div className="wrapper">
			<h1>
				Users
			</h1>

			{error && (
				<div className="error-message">
					{error}
				</div>
			)}

			<AddUserForm setError={setError} fetchUsers={fetchUsers} />

			{users.map((user) => (
				<div key={user.username} className="user-container">
					<h2>User_id: {user.username}</h2>
					<p>Password: {user.password}</p>
				</div>
			))}
		</div>
	);
}

export default Users;