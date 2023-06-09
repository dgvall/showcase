import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import "./SignUp.css"

function SignUp({setUser, setSelectedUser}) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [errors, setErrors] = useState([])

  const history = useHistory()

  function handleSubmit(e) {
    e.preventDefault()

    const userData = {
      username,
      password,
      password_confirmation: passwordConfirmation, 
      image_url: imageUrl
    }
    
    fetch('/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData)
    })
      .then(r => {
        if (r.ok) {
          r.json().then((user) => {
            setUser(user)
            setSelectedUser(user)
            history.push("/artworks")
          })
        }
        else {
          r.json().then((error) => {
            setErrors(error.errors)
          })
        }
      })
  }

  return (
    <div className = "form-container">
      <h2 className = "form-header">Sign Up</h2>
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
        <input
          className = "form-input"
          onChange = {(e) => setPasswordConfirmation(e.target.value)}
          value = {passwordConfirmation}
          placeholder = "Password Confirmation"
        />
        <input
          className = "form-input"
          onChange = {(e) => setImageUrl(e.target.value)}
          value = {imageUrl}
          placeholder = "Profile Picture"
        />
        <button className = "form-button">Create Account</button>
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

export default SignUp