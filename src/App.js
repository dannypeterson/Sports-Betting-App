import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

import Home from './pages/Home'
import Register from './pages/Register'
import GamesList from './pages/GamesList'
import { CheckSession } from './services/Auth'

function App() {
  const [user, setUser] = useState(null)

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  return (
    <div className="App">
      <main>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home setUser={setUser} />} />
          <Route path="/games" element={<GamesList user={user} />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
