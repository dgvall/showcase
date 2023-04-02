import React, {useState} from 'react'
import "./SignUp.css"
function SignUp() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")


  function handleSubmit(e) {
    e.preventDefault()

    const userData = {
      username,
      password,
      password_confirmation: passwordConfirmation
    }
    console.log(userData)
  }

  return (
    <div>
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

        <button className = "form-button">Create Account</button>
      </form>
    </div>
  )
}

export default SignUp