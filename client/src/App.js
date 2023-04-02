// import logo from './logo.svg';

import React, {useState, useEffect} from "react"
import {Switch, Route} from "react-router-dom"
import './App.css';

import NavBar from "./NavBar"
import Login from "./Login"
import SignUp from "./SignUp"

function App() {
  return (
    <div className="App">
      <NavBar />
      
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
