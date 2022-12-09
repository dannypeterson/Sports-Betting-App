import { Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Register from './pages/Register'

function App() {
  return (
    <div className="App">
      <header></header>
      <main>
        <Routes>
          <Route path="/" element={<Register />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
