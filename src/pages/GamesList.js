import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'
import axios from 'axios'

const GamesList = () => {
  const API_KEY = process.env.REACT_APP_ODDS_API_KEY

  const [games, setGames] = useState([])

  const getGames = async () => {
    let res = await axios.get(
      `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`
    )
    console.log(res.data)
    let gamesArray = []

    res.data.forEach((game) => {
      let h2h = game.bookmakers.filter((el) => el.key === 'fanduel')[0]
        .markets[0].outcomes

      let spread = game.bookmakers.filter((el) => el.key === 'fanduel')[0]
        .markets[1].outcomes

      // let totals = game.bookmakers.filter((el) => el.key === 'fanduel')[0]
      //   .markets[2].outcomes

      // console.log(totals)

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
        // over: {
        //   points: totals[0].point,
        //   price: totals[0].price
        // },
        // under: {
        //   points: totals[1].point,
        //   price: totals[1].price
        // },
        date: game.commence_time,
        id: game.id
      }
      gamesArray.push(gameDetails)
    })
    console.log(gamesArray)
    setGames(gamesArray)
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
      <div className="games-map">
        {games.map((game) => (
          <div key={game.id}>
            <div className="game-description">
              <p>{game.date}</p>
              <h3 className="team-names">
                {game.away_team} at {game.home_team}
              </h3>
            </div>
            <div className="game-moneyline">
              <p>
                {game.away_ML} {game.home_ML}
              </p>
            </div>
            <div className="game-totals">
              <p>
                {game.away_spread.points} {game.home_spread.points}
              </p>
            </div>
            {/* <div className="game-spread">
              <p>
                O: {game.over.points} U: {game.under.points}
              </p>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GamesList
