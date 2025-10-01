import React,{useState} from "react"
import {validateEmail, validatePassword} from "./validation"
import { Link } from 'react-router-dom';

export function LoginFormWrapper() {
  return (
    <>
      <LoginForm />
      <p class="form2">
        No account? <Link to="/signupform">Sign up</Link>
      </p>
    </>
  );
}

const LoginForm = () => {
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [errors, setErrors] = useState({})

  const handleLogin = (e) => {
    e.preventDefault()
    let err = {}
    if (!validateEmail(email))
      err.email = "Invalid email"
    if (!validatePassword(pass))
      err.pass = "Weak password"
    setErrors(err)

    if (Object.keys(err).length === 0)
      alert("Login Success")
  }

  return (
    <div className="form">
  <form onSubmit={handleLogin}>
    <h2 className="loginlabel">Login</h2>

    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      className={`input ${ email && validateEmail(email) ? "input-valid" : errors.email ? "input-error" : "" }`}
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

    <button className="loginbutton">Login</button>
  </form>
</div>
  )
}

export default LoginForm

