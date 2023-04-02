import React from "react"
import { NavLink } from "react-router-dom"

import "./NavBar.css"

function NavBar({user, handleLogout}) {
  return (
    <div id = "navbar">
      
      <NavLink
        exact to = "/"
      >Showcase</NavLink>
      {
        user
        ? 
        <div className = "navbar-logged">

          <NavLink
            exact to = "/account"
            className = "navbar-header"
          >Account</NavLink>

          <NavLink
            exact to = "/logout"
            className = "navbar-header"
            onClick = {handleLogout}
          >Logout</NavLink>

          <NavLink
            exact to = "/upload"
            className = "navbar-header"
          >Upload</NavLink>
        </div>
        :
        <div className = "navbar-logged">
          <NavLink
            exact to = "/login"
            className = "navbar-header"
          >Login</NavLink>

          <NavLink
            exact to = "/signup"
            className= "navbar-header"
          >Signup</NavLink>
        </div>
      }
    </div>
  )
}

export default NavBar