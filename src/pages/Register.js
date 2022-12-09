import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { RegisterUser } from '../services/Auth'

const Register = () => {
  let navigate = useNavigate()

  const initialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const [formState, setFormState] = useState(initialState)

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formState.password !== formState.confirmPassword) {
      alert('Passwords must match!')
      setFormState(initialState)
      return
    } else {
      await RegisterUser({
        username: formState.username,
        email: formState.email,
        password: formState.password
      })
      console.log(formState)

      setFormState(initialState)
      navigate('/home')
    }
  }

  return (
    <div className="register-container">
      <div className="register-title">
        <h1>
          Welcome to Pigskin Picks! You can start hitting those 7-leg parlays
          once you sign up for an account!
        </h1>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <div
          className="already-registered-button"
          onClick={() => navigate('/home')}
        >
          Already have an account?
        </div>
        {/* email label  */}
        <input
          required
          id="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          value={formState.email}
        />
        <br />
        {/* username label  */}
        <input
          required
          id="username"
          type="text"
          placeholder="Pick a username"
          onChange={handleChange}
          value={formState.username}
        />
        <br />

        {/* password label  */}
        <input
          required
          id="password"
          type="password"
          placeholder="Choose a password"
          onChange={handleChange}
          value={formState.password}
        />
        <br />

        {/* confirm password  */}
        <input
          required
          id="confirmPassword"
          type="password"
          placeholder="Confirm password"
          onChange={handleChange}
          value={formState.confirmPassword}
        />
        <br />

        <button className="register-button" type="submit">
          Sign Up!
        </button>
      </form>
    </div>
  )
}

export default Register
