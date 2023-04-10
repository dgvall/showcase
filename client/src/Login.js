import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import "./Login.css"

function Login({setUser, setSelectedUser}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [errors, setErrors] = useState([])

  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()

    const userData = {
      username,
      password
    }

    fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
      .then((r) => {
        if (r.ok) {
          r.json().then((user) => {
            setUser(user)
            setSelectedUser(user)
            history.push(`/users/${username}`)
          })
        }
        else {
          r.json().then((error) => setErrors(error.errors))
        }
      })
  }

  return (
    <div className = "form-container">
      <h2 className = "form-header">Login</h2>
      <form className = "form" onSubmit = {handleSubmit}>
        <input
          className = "form-input"
          onChange = {(e) => setUsername(e.target.value)}
          value = {username}
          placeholder = "Username"
        />
        <input
          className = "form-input"
          onChange = {(e) => setPassword(e.target.value)}
          value = {password}
          placeholder = "Password"
        />
        <button className = "form-button">Log In</button>
      </form>
      
      <ul className = "errors-list">
        {
          errors.map((e, index) => {
            return (
              <li
                key = {index}
              >{e}</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default Login