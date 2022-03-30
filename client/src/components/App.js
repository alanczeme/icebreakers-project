import React, { useEffect, useState } from 'react';
import { Route, Switch } from "react-router-dom";
import Homepage from './Homepage';
import NavBar from './NavBar';
import Profile from './Profile';
import Login from '../pages/Login';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  // Auto login
  useEffect(() => {
    fetch("/auth")
    .then(res => {
      if (res.ok) {
        res.json().then(user => setCurrentUser(user))
      }
    })
  }, []);

  if(!currentUser) return <Login onLogin={setCurrentUser} />

  return (
    <>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <main>
        <Switch>
          <Route path="/profile">
            <Profile currentUser={currentUser} />
          </Route>
          <Route exact path="/">
            <Homepage />
          </Route>
        </Switch>
      </main>
    </>
  );
}

export default App;
