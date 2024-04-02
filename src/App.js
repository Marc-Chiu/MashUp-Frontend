import React from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

//import Users from 'Components/Users';
import Home from './Components/Home';
import LoginPage from './Components/Login';
import SignUp from './Components/SignUp';
import Restaurants from './Components/Restaurants';
// import Login from '../Login';
// import SignUp from '../SignUp';
import Groups from './Components/Groups';
import Search from './Components/Search';
import GroupHome from './Components/GroupHome';

function App() {

  function handleLogin(data) {
    console.log("handling log in");
    sessionStorage.setItem("user", data.username);
    console.log(sessionStorage.getItem("user"));
    window.location.reload(); // Refresh the page to show the welcome page
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={sessionStorage.getItem("user") ? <Home user={sessionStorage.getItem("user")} /> : <LoginPage onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/search" element={<Search />} />
        <Route path="/groupHome" element={<GroupHome />} />
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
