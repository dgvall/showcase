import React, {useState} from "react"
import { NavLink } from "react-router-dom"

import "./NavBar.css"

function NavBar({user, handleLogout, handleSearch}) {
  const [search, setSearch] = useState("")
  return (
    <div id = "navbar">
      
      <NavLink
        exact to = "/artworks"
      >Showcase</NavLink>
      <form
      id = "search-bar"
      onSubmit = {(e) => handleSearch(e, search)}
      >
      <input
        placeholder = "Search"
        onChange = {(e) => setSearch(e.target.value)}
        value = {search}
      >
      </input>
      <button>🔎</button>
      </form>
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