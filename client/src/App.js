// import logo from './logo.svg';

import React, {useState, useEffect} from "react"
import {Switch, Route} from "react-router-dom"
import './App.css';

import NavBar from "./NavBar"
import Login from "./Login"
import SignUp from "./SignUp"
import UploadForm from "./UploadForm"
import Home from "./Home";

function App() {
  const [user, setUser] = useState(null)
  const [homeArtworks, setHomeArtworks] = useState([])

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user))
      }
    })

    fetch("/artworks")
    .then((r) => r.json())
    .then((art) => setHomeArtworks(art))
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

  return (
    <div className="App">
      <NavBar user = {user} handleLogout = {onLogout} />
      
      <Switch>
        <Route exact path = "/">
          <Home art = {homeArtworks}/>
        </Route>

        <Route exact path = "/login">
          <Login setUser = {setUser}/>
        </Route>

        <Route exact path = "/signup">
          <SignUp setUser = {setUser}/>
        </Route>

        <Route exact path = "/upload">
          <UploadForm />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
