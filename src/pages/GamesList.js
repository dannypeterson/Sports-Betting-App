import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import Client from '../services/api'
import axios from 'axios'

const GamesList = ({ user }) => {
  const API_KEY = process.env.REACT_APP_ODDS_API_KEY

  // let isBetSlipOpen = false

  const [games, setGames] = useState([])
  const [betSlip, setBetSlip] = useState(false)
  const [odds, setOdds] = useState(null)
  const [wager, setWager] = useState(null)
  const [payout, setPayout] = useState(0)

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
        date: game.commence_time,
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

  const handleChange = (e) => {
    setWager(e.target.value)
    // setPayout()
    if (odds < 0) {
      let pay = Math.round((100 / odds) * wager * -1)
      setPayout(pay)
    } else {
      let pay = Math.round((odds / 100) * wager)
      setPayout(pay)
    }
  }

  const handleBet = (e) => {
    setBetSlip(true)
    setOdds(parseFloat(e.target.id))
  }

  return (
    <div className="games-container">
      <nav>
        <p>Pigskin Picks</p>
        <p></p>
      </nav>

      <div className="betslip">
        {betSlip ? (
          <div>
            <h2>Bet Slip:</h2>
            <p>{odds}</p>
            <input
              type="text"
              placeholder="Enter wager here"
              onChange={handleChange}
            />
            <p>Payout: ${payout}</p>
          </div>
        ) : null}
      </div>

      <div className="games-map">
        {games.map((game) => (
          <div key={game.id}>
            <div className="game-description">
              <p>{game.date}</p>
              <h3 className="team-names">{game.away_team}</h3>
              <p>at</p>
              <h3 className="team-names">{game.home_team}</h3>
            </div>
            <div className="game-moneyline">
              <h4>ML</h4>
              <p id={game.away_ML} onClick={handleBet}>
                {game.away_ML}
              </p>
              <p id={game.home_ML} onClick={handleBet}>
                {game.home_ML}
              </p>
            </div>
            <div className="game-totals">
              <h4>Spread</h4>
              <p onClick={handleBet} id={game.away_spread.price}>
                {game.away_spread.points}
                {game.away_spread.price}
              </p>
              <p onClick={handleBet} id={game.home_spread.price}>
                {game.home_spread.points}
                {game.home_spread.price}
              </p>
            </div>
            {game.over ? (
              <div className="game-totals">
                <h4>O:</h4>
                <p onClick={handleBet} id={game.over.price}>
                  {game.over.points}
                  {game.over.price}
                </p>
                <h4>U:</h4>
                <p onClick={handleBet} id={game.under.price}>
                  {game.under.points}
                  {game.under.price}
                </p>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GamesList