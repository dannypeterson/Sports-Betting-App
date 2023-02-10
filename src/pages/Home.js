import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const Home = ({ setUser }) => {
  let navigate = useNavigate()

  const initialState = {
    email: '',
    password: ''
  }

  const [formState, setFormState] = useState(initialState)
  const [login, setLogin] = useState(false)

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await SignInUser({
      email: formState.email,
      password: formState.password
    })
    const payload = await SignInUser(formState)
    setUser(payload)

    setFormState(initialState)
    navigate('/games')
  }

  const demoSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser({
      email: 'lamarjackson@gmail.com',
      password: 'lamar'
    })
    await setUser(payload)
    navigate('/games')
  }

  return (
    <div className="home-container">
      <div className="home-title">
        <h1>Login to Pigskin Picks</h1>
      </div>
      <img className="logo" src="../../assets/images/logo.png"></img>

      <form className="login-form" onSubmit={demoSubmit}>
        {/* email label  */}
        {/* <div className="input-outer-container">
          <div className="input-inner-container">
            <span>EMAIL</span>
            <input
              required
              id="email"
              value={formState.email}
              className="wager-input"
              type="email"
              onChange={handleChange}
            />
          </div>
        </div>
        <br /> */}

        {/* password label  */}
        {/* <div className="input-outer-container">
          <div className="input-inner-container">
            <span>PASSWORD</span>
            <input
              required
              id="password"
              value={formState.password}
              className="wager-input"
              type="password"
              onChange={handleChange}
            />
          </div>
        </div>
        <br /> */}

        <button
          type="submit"
          className="already-registered-button"
          onClick={() => setLogin(true)}
        >
          Start Demo
        </button>
      </form>

      <button className="back-to-register" onClick={() => navigate('/')}>
        Don't have an account? Register Here.
      </button>
    </div>
  )
}

export default Home
