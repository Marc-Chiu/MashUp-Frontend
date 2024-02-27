import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
 
import { BACKEND_URL } from '../../constants';

const GROUPS_ENDPOINT = `${BACKEND_URL}/groups`;

function AddGroupForm({
    visible,
    cancel,
    fetchGroups,
    setError,
}) {
    const [name, setName] = useState('');
    const [member, setMember] = useState('');

    const changeName = (event) => { setName(event.target.value); };
    const changeMember = (event) => { setMember(event.target.value); };

    const addGroup = (event) => {
        event.preventDefault();
        axios.post(GROUPS_ENDPOINT, { name, member })
            .then(fetchGroups)
            .catch(() => { setError('There was a problem creating a group.'); });
    };

    if (!visible) return null;
    return (
        <form>
        <label htmlFor="name">
            Group Name
        </label>
        <input required type="text" id="name" value={name} onChange={changeName} />
        <label htmlFor="members">
            Member
        </label>
        <input required type="text" id="members" value={member} onChange={changeMember} />
        <button type="button" onClick={cancel}>Cancel</button>
        <button type="submit" onClick={addGroup}>Submit</button>
        </form>
    );
    }

AddGroupForm.propTypes = {
    visible: propTypes.bool.isRequired,
    cancel: propTypes.func.isRequired,
    fetchGroups: propTypes.func.isRequired,
    setError: propTypes.func.isRequired,
};

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

function Group({ group }) {
    const { name, member } = group;
    return (
        <Link to={name}>
            <div className="group-container">
                <h2>{name}</h2>
                <p>{member}</p>
            </div>
        </Link>
    );
}
Group.propTypes = {
    group: propTypes.shape({
        name: propTypes.string.isRequired,
        member: propTypes.string.isRequired,
    }).isRequired,
};

function Groups() {
    const [error, setError] = useState('');
    const [groups, setGroups] = useState([]);
    const [addingGroup, setAddingGroup] = useState(false);

    const fetchGroups = () => {
        axios.get('http://localhost:8000/groups')
        .then((response) => {
            const groupsObject = response.data.Data;
            const keys = Object.keys(groupsObject);
            const groupsArray = keys.map((key) => groupsObject[key]);
            setGroups(groupsArray);
        console.log(response.data.Data)
            console.log("fetching data")
        })
        .catch((e) => {
            if (e.response && e.response.data && e.response.data.message) {
                setError(e.response.data.message);
            } else {
                setError('There was a problem retrieving the list of groups.');
            }
        });
    };

    const showAddGroupForm = () => { setAddingGroup(true); };
    const hideAddGroupForm = () => { setAddingGroup(false); };

    useEffect(
        fetchGroups,
        [],
    );


    return (
        <div className="wrapper">
            <header>
                <h1>
                    View All Groups
                </h1>
                <button type="button" onClick={showAddGroupForm}>
                    Add a Group
                </button>
            </header>
        <AddGroupForm
            visible={addingGroup}
            cancel={hideAddGroupForm}
            fetchGames={fetchGroups}
            setError={setError}
        />
        {error && <ErrorMessage message={error} />}

      
        {groups.map((group) => (
            <div key={group.name} className="group-container">
                <h2> Group Name: {group.name}</h2>
                <p> Members: {group.member}</p>
            </div>
        ))}
        </div>
    );
}

export default Groups;