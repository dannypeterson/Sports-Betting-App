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
      <h1>Pigskin Picks</h1>
      <h3>A parlay a day keeps the worries away!</h3>
      <div className="sign-up-card">
        <p>Create a Pigskin account</p>
        <div
          className="already-registered-button"
          onClick={() => navigate('/home')}
        >
          <p>Already have an account?</p>
        </div>
        <form className="register-form" onSubmit={handleSubmit}>
          {/* email label  */}
          <div className="input-outer-container">
            <div className="input-inner-container">
              <span>EMAIL</span>
              <input
                required
                className="wager-input"
                id="email"
                type="email"
                onChange={handleChange}
                value={formState.email}
              />
            </div>
          </div>
          {/* username label  */}
          <div className="input-outer-container">
            <div className="input-inner-container">
              <span>USERNAME</span>
              <input
                required
                className="wager-input"
                id="username"
                type="text"
                onChange={handleChange}
                value={formState.username}
              />
            </div>
          </div>
          <br />

          {/* password label  */}
          <div className="input-outer-container">
            <div className="input-inner-container">
              <span>PASSWORD</span>
              <input
                required
                id="password"
                type="password"
                onChange={handleChange}
                value={formState.password}
                className="wager-input"
              />
            </div>
          </div>
          {/* confirm password  */}

          <div className="input-outer-container">
            <div className="input-inner-container">
              <span>CONFIRM PASSWORD</span>
              <input
                className="wager-input"
                required
                id="confirmPassword"
                type="password"
                onChange={handleChange}
                value={formState.confirmPassword}
              />
            </div>
          </div>

          <br />

          <button className="register-button" type="submit">
            Sign Up!
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
