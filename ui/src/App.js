
import React, { useState, useEffect } from 'react';

import logo from './logo.svg';
import './App.css';
import { getUser } from './service/userService'

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
      getUser()
        .then(users => {
          console.log(users)
          setUsers(users);
        });
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          TEST: {users}
        </a>
      </header>
    </div>
  );
}

export default App;
