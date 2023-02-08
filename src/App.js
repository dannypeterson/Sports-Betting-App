import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'

import { CheckSession } from './services/Auth'
import Home from './pages/Home'
import Register from './pages/Register'
import GamesList from './pages/GamesList'
import Profile from './pages/Profile'
import ScoresList from './pages/ScoresList'
import Client from './services/api'
import Logout from './pages/Logout'
import SelectLeague from './pages/SelectLeague'

function App() {
  const [user, setUser] = useState(null)
  const [gamesInDb, setGamesInDb] = useState(null)
  const [league, setLeague] = useState(null)

  const getAllGames = async () => {
    let res = await Client.get(`/games`)
    setGamesInDb(res.data)
  }

  const updateGames = async () => {
    await Client.put(`/games`, gamesInDb)
    console.log('ran updateGames function')
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
    getAllGames()
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
          <Route path="/leagues" element={<SelectLeague />} />
          <Route
            path="/games"
            element={
              <GamesList
                user={user}
                gamesInDb={gamesInDb}
                setGamesInDb={setGamesInDb}
                getAllGames={getAllGames}
              />
            }
          />
          <Route
            path="/scores"
            element={
              <ScoresList
                user={user}
                gamesInDb={gamesInDb}
                setGamesInDb={setGamesInDb}
              />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                user={user}
                gamesInDb={gamesInDb}
                updateGames={updateGames}
              />
            }
          />
          <Route
            path="/logout"
            element={<Logout setUser={setUser} handleLogOut={handleLogOut} />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
