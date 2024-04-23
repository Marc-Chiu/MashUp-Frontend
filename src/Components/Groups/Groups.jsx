import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BACKEND_URL } from '../../constants';
import Navbar from '../Navbar';

const GROUPS_ENDPOINT = `${BACKEND_URL}/groups`;

function MakeGroupForm({
    visible,
    cancel,
    fetchGroups,
    setError,
}) {
    const [Group_Name, setName] = useState('');
    const [name, setOwner] = useState('');
    const [password, setPassword] = useState('');

    const changeName = (event) => { setName(event.target.value); };
    const changeOwner = (event) => { setOwner(event.target.value); };
    const changePassword = (event) => { setPassword(event.target.value); };

    const addGroup = (event) => {
        event.preventDefault();
        axios.post(GROUPS_ENDPOINT, { group_name: Group_Name, Name: name, Password: password})
            .then(fetchGroups)
            .catch((e) => {
                if(e.response && e.response.data && e.response.data.message) {
                    setError(e.response.data.message);
                } else{
                    setError('There was a problem adding a group');
                }
            });
    }
    if (!visible) return null;
    return (
        <form>
            <div className="form-row">
                <div className="form-item">
                    <label htmlFor="name">
                        Group Name
                    </label>
                    <input required type="text" id="name" value={Group_Name} onChange={changeName} />
                </div>
                <div className="form-item">
                    <label htmlFor="Members">
                        Members
                    </label>
                    <input required type="text" id="Members" value={name} onChange={changeOwner} />
                </div>
                <div className="form-item">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input required type="password" id="password" value={password} onChange={changePassword} />
                </div>
            </div>
            <button type="submit" className="grps-button2" onClick={cancel}>Cancel <span></span><span></span><span></span><span></span></button>
            <span className="button-spacing"></span>
            <button type="submit" className="grps-button" onClick={addGroup}>Submit <span></span><span></span><span></span><span></span></button>
        </form>
    );
}

MakeGroupForm.propTypes = {
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

// Join group form

function JoinGroupForm({
    visible,
    cancel,
    fetchGroups,
    setError,
}) {
    const [Group_Name, setName] = useState('');
    const [password, setPassword] = useState('');

    const changeName = (event) => { setName(event.target.value); };
    const changePassword = (event) => { setPassword(event.target.value); };

    const joinGroup = (event) => {
        console.log(Group_Name);
        event.preventDefault();
        axios.post(GROUPS_ENDPOINT + '/add_member', { group_name: Group_Name, Name: sessionStorage.getItem("user"), Password: password})
            .then(fetchGroups)
            .catch((e) => {
                if(e.response && e.response.data && e.response.data.message) {
                    setError(e.response.data.message);
                } else{
                    setError('There was a problem adding a group');
                }
            });
    }
    if (!visible) return null;
    return (
        <form>
            <div className="form-row2">
                <div className="form-item2">
                    <label htmlFor="name">
                        Group Name
                    </label>
                    <input required type="text" id="name" value={Group_Name} onChange={changeName} />
                </div>
                <div className="form-item2">
                    <label htmlFor="password">
                        Code
                    </label>
                    <input required type="password" id="password" value={password} onChange={changePassword} />
                </div>
            </div>
            <button type="submit" className="grps-button2" onClick={cancel}>Cancel <span></span><span></span><span></span><span></span></button>
            <span className="button-spacing"></span>
            <button type="submit" className="grps-button" onClick={joinGroup}>Submit <span></span><span></span><span></span><span></span></button>
        </form>
    );
}

JoinGroupForm.propTypes = {
    visible: propTypes.bool.isRequired,
    cancel: propTypes.func.isRequired,
    fetchGroups: propTypes.func.isRequired,
    setError: propTypes.func.isRequired,
};


function Group({ group }) {
    console.log(group);
    const { name, Members, Restaurants } = group;
    return (
        <Link to={name}>
            <div className="group-container">
                <h2>{name}</h2>
                <p>{Members}</p>
                <p>{Restaurants}</p>
            </div>
        </Link>
    );
}

Group.propTypes = {
    group: propTypes.shape({
        name: propTypes.string.isRequired,
        Members: propTypes.string.isRequired,
        Restaurants: propTypes.string.isRequired,
    }).isRequired,
};

function leaveGroup(group) {
    console.log(GROUPS_ENDPOINT + '/delete/' + localStorage.getItem("user") + '/' + group)
    axios.delete(GROUPS_ENDPOINT + '/delete/user' + localStorage.getItem("user") + '/' + group)
        .then((response) => {
            console.log(response.data)
            location.reload();
            })
        .catch((e) => {
            if (e.response && e.response.data && e.response.data.message) {
                console.log(e.response.data.message);
            } else {
                console.log('There was a problem retrieving the list of groups.');
            }
        });
}

function Groups() {
    const [error, setError] = useState('');
    const [groups, setGroups] = useState([]);
    const [addingGroup, setAddingGroup] = useState(false);
    const [joiningGroup, setJoiningGroup] = useState(false);
    const [searchGroup, setSearchGroup] = useState('');

    const fetchGroups = () => {
        axios.get(GROUPS_ENDPOINT)
            .then((response) => {
                const groupsObject = response.data.Data;
                const filteredGroups = Object.values(groupsObject).filter(group => group.Members.includes(sessionStorage.getItem("user")));
                const groupsArray = Object.values(filteredGroups).map(group => ({
                    name: group.group_name,
                    Members: group.Members, // Flatten the array of Members
                    Restaurants: group.Restaurants,
                }));
                console.log("fetching data")
                console.log(groupsArray);
                setGroups(groupsArray);
            })
            .catch((e) => {
                if (e.response && e.response.data && e.response.data.message) {
                    setError(e.response.data.message);
                } else {
                    setError('There was a problem retrieving the list of groups.');
                }
            });
    };

    useEffect(
        fetchGroups,
        [],
    );

    const showMakeGroupForm = () => { setAddingGroup(true); };
    const hideMakeGroupForm = () => { setAddingGroup(false); };

    const showJoinGroupForm = () => { setJoiningGroup(true); };
    const hideJoinGroupForm = () => { setJoiningGroup(false); };

    const filterGroupName = groups.filter(group => group.name.toLowerCase().includes(searchGroup.toLowerCase()));

    return (
        <div>
            <Navbar />
            <div className="wrapper">
                <header>
                    <h1>
                        View All Groups
                    </h1>
                    <div className = "group-button">
                        <button type="button" onClick={showMakeGroupForm}>
                            Make a Group <span></span><span></span><span></span><span></span>
                        </button>
                        <button type="button" onClick={showJoinGroupForm}>
                            Join a Group <span></span><span></span><span></span><span></span>
                        </button>
                    </div>
                    <input type="text" className="search-box1" placeholder="Search group name" value={searchGroup} onChange={(e) => setSearchGroup(e.target.value)} />
                </header>
            <MakeGroupForm
                visible={addingGroup}
                cancel={hideMakeGroupForm}
                fetchGroups={fetchGroups}
                setError={setError}
            />
            <JoinGroupForm
                visible={joiningGroup}
                cancel={hideJoinGroupForm}
                fetchGroups={fetchGroups}
                setError={setError}
            />
            {error && <ErrorMessage message={error} />}

            {filterGroupName.map((group) => (
                <div key={group.name} className="group-container">
                    <h2> Group Name: {group.name}</h2>
                    <p> Members: {group.Members}</p>
                    {/*<p> Restaurants: {group.Restaurants}</p>*/}
                    <div className = "group-button">
                        <button type="button" className="group-button" onClick={() => leaveGroup(group.name)} > Leave Group <span></span><span></span><span></span><span></span></button>
                        <button type="button" className="group-button1" onClick={() => sessionStorage.setItem("Group", group.name)}> <Link to='/groupHome'>view page <span></span><span></span><span></span><span></span></Link></button>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
}

export default Groups;