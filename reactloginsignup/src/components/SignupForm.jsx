import React,{useState} from "react"
import {validateEmail, validatePassword, validateUsername} from "./validation"
import { Link } from 'react-router-dom';

export function SignupFormWrapper() {
  return (
    <>
      <SignupForm />
      <p class="form2">
        Already registered? <Link to="/loginform">Login</Link>
      </p>
    </>
  );
}

const SignupForm = () => {
  const [user, setUser] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [confirm, setConfirm] = useState("")
  const [errors, setErrors] = useState({})

  const handleSignup = (e) => {
    e.preventDefault()
    let err = {}
    if (!validateUsername(user))
      err.user = "Invalid username"
    if (!validateEmail(email))
      err.email = "Invalid email"
    if (!validatePassword(pass))
      err.pass = "Weak password"
    if (pass !== confirm)
      err.confirm = "Passwords do not match"
    setErrors(err)

    if (Object.keys(err).length === 0)
      alert("Signup Success")
  }

  return (
    <div className="form">
  <form onSubmit={handleSignup}>
    <h2 className="signuplabel">Sign Up</h2>

    <input
      type="text"
      placeholder="Username"
      value={user}
      onChange={(e) => setUser(e.target.value)}
      className={`input ${ user && validateUsername(user) ? "input-valid": errors.user ? "input-error": "" }`}
    />
    {errors.user && <p className="error-text">{errors.user}</p>}

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className={`input ${ email && validateEmail(email) ? "input-valid": errors.email ? "input-error": "" }`}
    />
    {errors.email && <p className="error-text">{errors.email}</p>}

    <input
      type="password"
      placeholder="Password"
      value={pass}
      onChange={(e) => setPass(e.target.value)}
      className={`input ${ pass && validatePassword(pass) ? "input-valid": errors.pass ? "input-error": "" }`}
    />
    {errors.pass && <p className="error-text">{errors.pass}</p>}

    <input
      type="password"
      placeholder="Confirm Password"
      value={confirm}
      onChange={(e) => setConfirm(e.target.value)}
      className={`input ${ confirm && confirm === pass ? "input-valid": errors.confirm ? "input-error": "" }`}
    />
    {errors.confirm && <p className="error-text">{errors.confirm}</p>}

    <button className="signup-button">Sign Up</button>
  </form>
</div>
  )
}

export default SignupForm

