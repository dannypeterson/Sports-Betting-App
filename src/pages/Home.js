import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SignInUser } from '../services/Auth'

const Home = () => {
  let navigate = useNavigate()

  const initialState = {
    username: '',
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
      <form className="login-form" onSubmit={handleSubmit}></form>
    </div>
  )
}

export default Home
