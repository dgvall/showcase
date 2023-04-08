import React, {useState} from "react"
import { NavLink } from "react-router-dom"

import "./NavBar.css"

function NavBar({currentUser, handleLogout, handleSearch}) {
  const [search, setSearch] = useState("")
  const [hovered, setHovered] = useState()
  return (
    <nav id = "navbar">
      
      <NavLink
        className = "navbar-header"
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
        currentUser
        ? 
        <div className = "navbar-logged">
          <ul
            className = "navbar-account"
            onMouseEnter = {() => setHovered(true)}
            onMouseLeave = {() => setHovered(false)}
          >
            <li id = "account">Account</li>
            {
              hovered && (
                <div>
                    <li>
                      <NavLink
                        to = {`/users/${currentUser.username}`}
                        className = "navbar-header"
                      >Profile</NavLink>
                    </li>
                    <li>
                      <NavLink
                        exact to = "/logout"
                        className = "navbar-header"
                        onClick = {handleLogout}
                    >Logout</NavLink>
                    </li>
                </div>
              )
            }
          </ul>




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
    </nav>
  )
}

export default NavBar