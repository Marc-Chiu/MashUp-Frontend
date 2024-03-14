import React from 'react';
import Home from './Components/Home';
import LoginPage from './Components/Login';
import SignUp from './Components/SignUp';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import Groups from './Components/Groups';

function App() {

  return (
    <div>
<Groups />
    </div>
  )

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
        {/* Add more routes as needed */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
