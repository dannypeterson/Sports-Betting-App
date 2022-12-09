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

  return (
    <div className="home-container">
      <div className="home-title">
        <h1>Login to Pigskin Picks</h1>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        {/* email label  */}
        <input
          required
          id="email"
          value={formState.email}
          placeholder="Email"
          type="email"
          onChange={handleChange}
        />
        <br />

        {/* password label  */}
        <input
          required
          id="password"
          value={formState.password}
          placeholder="Password"
          type="password"
          onChange={handleChange}
        />
        <br />

        <button className="login-button" onClick={() => setLogin(true)}>
          Sign In
        </button>
      </form>
      <p>Dont have an account?</p>
      <button onClick={() => navigate('/')}>Register Here</button>
    </div>
  )
}

export default Home
