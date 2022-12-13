
import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import { getUser } from './service/userService'
import {Profile} from "./components/profile";
import {Header} from "./components/header";
import {Login} from "./components/login";
import {Forum} from "./components/forum";
import {News} from "./components/news";

function App() {

  // const [users, setUsers] = useState([])
  //
  // useEffect(() => {
  //     getUser()
  //       .then(users => {
  //         console.log(users)
  //         setUsers(users);
  //       });
  // }, [])
    const [page, setPage] = useState('login')
    const [loggedInUser, setLoggedInUser] = useState('')

    const header = <Header username={loggedInUser} setPage={setPage}/>;

    const Router = () => {
        switch (page) {
            case 'login':
                return (
                        <Login setPage={setPage} setLoggedInUser={setLoggedInUser}/>
                )
            case 'profile':
                return (
                    <>
                        {header}
                        <Profile username={loggedInUser}/>
                    </>
                )
            case 'forum':
                return (
                    <>
                        {header}
                        <Forum/>
                    </>
                )
            case 'news':
                return (
                    <>
                        {header}
                        <News/>
                        </>
                )
            default:
                return (<login setPage={setPage}/>)
        }
    }

  return (
    <div className="App">
        {Router()}
    </div>
  );
}

export default App;
