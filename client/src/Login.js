import React, { useState } from 'react'

function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

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
      .then(res => res.json())
      .then(data => console.log(data))
  }

  return (
    <div>
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

      <button className = "form-button">Create Account</button>
    </form>
  </div>
  )
}

export default Login