
import React, { useState, useEffect } from 'react';

import './App.css';
import {Profile} from "./components/profile";
import {Header} from "./components/header";
import {Login} from "./components/login";
import {Forum} from "./components/forum";
import {News} from "./components/news";
import {Admin} from "./components/admin";
import {GiveFeedback} from "./components/giveFeedback";

function App() {

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
            case 'give':
                return (
                    <>
                        {header}
                        <GiveFeedback username={loggedInUser}/>
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
            case 'admin':
                return (
                    <>
                        {header}
                        <Admin/>
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
