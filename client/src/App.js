// import logo from './logo.svg';

import React, {useState, useEffect} from "react"
import {Switch, Route} from "react-router-dom"
import './App.css';

import NavBar from "./NavBar"
import Login from "./Login"
import SignUp from "./SignUp"

function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })
  }, [])

  function onLogout() {
    fetch("/logout", {
      method: "DELETE"
    })
    .then((r) => {
      if (r.ok) {
        setUser(null)
      }
    })
  }

  console.log(user)

  return (
    <div className="App">
      <NavBar user = {user} handleLogout = {onLogout}/>
      
      <Switch>
        <Route exact path = "/login">
          <Login />
        </Route>

        <Route exact path = "/signup">
          <SignUp />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
