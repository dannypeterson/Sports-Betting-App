import { Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Register from './pages/Register'
import GamesList from './pages/GamesList'

function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/games" element={<GamesList />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
