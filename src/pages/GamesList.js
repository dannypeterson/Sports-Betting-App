import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import Client from '../services/api'
import axios from 'axios'
import Nav from '../components/Nav'
import Game from '../components/Game'
import BetSlip from '../components/BetSlip'

const GamesList = ({ user }) => {
  const API_KEY = process.env.REACT_APP_ODDS_API_KEY

  const [games, setGames] = useState([])
  const [odds, setOdds] = useState(null)
  const [betSlipOpen, setBetSlipOpen] = useState(false)

  const getGames = async () => {
    let res = await axios.get(
      `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`
    )
    // console.log(res.data)
    let gamesArray = []

    res.data.forEach((game) => {
      let h2h = game.bookmakers.filter((el) => el.key === 'fanduel')[0]
        .markets[0].outcomes

      let spread = game.bookmakers.filter((el) => el.key === 'fanduel')[0]
        .markets[1].outcomes

      let totals = game.bookmakers.filter((el) => el.key === 'fanduel')[0]
        .markets[2]?.outcomes

      let date = new Date(game.commence_time)

      const dateString = date.toLocaleString('en-US', {
        month: 'long',
        day: 'numeric',
        // year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'EST'
      })

      let gameDetails = {
        home_team: h2h[1].name,
        home_ML: h2h[1].price,
        home_spread: {
          points: spread[1].point,
          price: spread[1].price
        },
        away_team: h2h[0].name,
        away_ML: h2h[0].price,
        away_spread: {
          points: spread[0].point,
          price: spread[0].price
        },
        date: dateString,
        id: game.id
      }

      if (totals) {
        gameDetails.over = {
          points: totals[0].point,
          price: totals[0].price
        }
        gameDetails.under = {
          points: totals[1].point,
          price: totals[1].price
        }
      }

      gamesArray.push(gameDetails)
    })
    // console.log(gamesArray)
    setGames(gamesArray)
  }

  useEffect(() => {
    getGames()
  }, [])

  // try async to fix delay?
  const handleBet = (e, info) => {
    setBetSlipOpen(true)
    console.log(info)
    console.log(e.target.id)
    setOdds(e.target.id)
    // setOdds(parseFloat(e.target.id))
  }

  return (
    <div className="game-container">
      <Nav user={user} />

      <div className="game-columns">
        <h4>NFL</h4>
        <p>Spread</p>
        <p>Moneyline</p>
        <p>Total</p>
      </div>
      <Game games={games} handleBet={handleBet} />
      <BetSlip betSlipOpen={betSlipOpen} odds={odds} />
    </div>
  )
}

export default GamesList
