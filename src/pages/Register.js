import { useState, useEffect } from 'react'

const Register = () => {
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
    if (formState.password != formState.confirmPassword) {
      alert('Passwords must match!')
      setFormState(initialState)
      return
    } else {
    }
  }

  return <div>sign up here</div>
}

export default Register
