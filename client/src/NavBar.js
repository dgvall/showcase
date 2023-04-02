import React from "react"
import { NavLink } from "react-router-dom"

import "./NavBar.css"

function NavBar() {
  return (
    <div id = "navbar">
      
      <NavLink
        exact to = "/"
      >Showcase</NavLink>
      
      <div id = "account-setup">
        <NavLink
          exact to = "/login"
          className = "navbar-header"
        >Login</NavLink>

        <NavLink
          exact to = "/signup"
          className= "navbar-header"
        >Signup</NavLink>
      </div>
    </div>
  )
}

export default NavBar