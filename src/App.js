// import React from 'react';
// //import { CookiesProvider, useCookies } from 'react-cookie'
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from 'react-router-dom';

// import './App.css';

// import Navbar from './Components/Navbar';
// import Users from './Components/Users';
// import Resaurants from './Components/Restaurants';
// import Login from './Components/Login';
// import Groups from './Components/Groups';

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />
//       <Routes>
//         <Route path="users" element={<Users />} />
//         <Route path="restaurants" element={<Resaurants />} />
//         <Route path="login" element={<Login />} />
//         <Route path="groups" element={<Groups />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


import React from 'react'
//import Resaurants from './Components/Restaurants';
import Home from './Components/Home'
import LoginPage from './Components/Login'
//import { CookiesProvider, useCookies } from 'react-cookie'
// import {
//   BrowserRouter,
//   Routes,
//   Route,
// } from 'react-router-dom';

function App() {
 // const [cookies, setCookie] = useCookies(['username']);

  function handleLogin(data) {
    console.log("handling log in");
    sessionStorage.setItem("user", data.username);
    console.log(sessionStorage.getItem("user"));
    window.location.reload(); // Refresh the page to show the welcome page
    //setCookie('username', data.username, { path: '/' });
  }

      if (sessionStorage.getItem("user") !== null) {
        return <Home user={sessionStorage.getItem("user")} />;
      } else {
        return <LoginPage onLogin={handleLogin} />;
      }
}

export default App;
