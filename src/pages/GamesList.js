import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
import axios from 'axios'

const GamesList = () => {
  const API_KEY = process.env.REACT_APP_ODDS_API_KEY

  const [games, setGames] = useState([])

  const getGames = async () => {
    let res = await axios.get(
      `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads&oddsFormat=american`
    )
    console.log(res.data)
    setGames(res.data)
  }

  useEffect(() => {
    getGames()
  }, [])

  return (
    <div className="games-container">
      <nav>
        <p>Pigskin Picks</p>
        <p></p>
      </nav>
    </div>
  )
}

export default GamesList
