import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// import Client from '../services/api'
import axios from 'axios'
import Nav from '../components/Nav'
import Game from '../components/Game'
import BetSlip from '../components/BetSlip'

const GamesList = ({ user, gamesInDb, setGamesInDb, getAllGames }) => {
  const API_KEY = process.env.REACT_APP_ODDS_API_KEY

  const [games, setGames] = useState([])
  const [odds, setOdds] = useState(null)
  const [betSlipOpen, setBetSlipOpen] = useState(false)
  const [betDetails, setBetDetails] = useState(null)
  const [gameId, setGameId] = useState(null)

  const [league, setLeague] = useState('epl')

  const [predictedTeam, setPredictedTeam] = useState(null)
  const [betType, setBetType] = useState(null)
  const [points, setPoints] = useState(null)

  const getGames = async () => {
    let eplData = await axios.get(
      `https://api.the-odds-api.com/v4/sports/soccer_epl/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`
    )

    let nflData = await axios.get(
      `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/odds/?apiKey=${API_KEY}&regions=us&markets=h2h,spreads,totals&oddsFormat=american`
    )

    let gamesArray = []

    // console.log(nflData)

    if (league === 'nfl') {
      nflData.data.forEach((game) => {
        let h2h = game.bookmakers.filter((el) => el.key === 'fanduel')[0]
          .markets[0]?.outcomes

        let spread = game.bookmakers.filter((el) => el.key === 'fanduel')[0]
          .markets[1]?.outcomes

        let totals = game.bookmakers.filter((el) => el.key === 'fanduel')[0]
          .markets[2]?.outcomes

        let date = new Date(game.commence_time)

        const dateString = date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'EST'
        })

        let gameDetails = {
          league: 'nfl',
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
          id: game.id,
          inProgress: true
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
    } else {
      eplData.data.forEach((game) => {
        let h2h = game.bookmakers.filter((el) => el.key === 'bovada')[0]
          .markets[0]?.outcomes

        let spread = game.bookmakers.filter((el) => el.key === 'bovada')[0]
          .markets[1]?.outcomes

        let totals = game.bookmakers.filter((el) => el.key === 'bovada')[0]
          .markets[2]?.outcomes

        let date = new Date(game.commence_time)

        const dateString = date.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZone: 'EST'
        })

        let gameDetails = {
          league: 'epl',
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
          id: game.id,
          inProgress: true
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
    }

    // console.log(eplData)

    setGames(gamesArray)
  }

  useEffect(() => {
    getGames()
  }, [league])

  const handleBet = (e, info, type, team, spread) => {
    setBetSlipOpen(true)
    setBetDetails(info)
    setBetType(type)
    setOdds(e.target.id)
  }

  return (
    <div className="game-container">
      <Nav user={user} />
      <div className="grid-container">
        <section>
          <div className="game-columns">
            {league === 'epl' ? (
              <h4>
                <span
                  style={{ color: 'gray' }}
                  className="choose-nfl"
                  onClick={() => setLeague('nfl')}
                >
                  NFL
                </span>
                <span className="choose-epl" onClick={() => setLeague('epl')}>
                  , English Premier League
                </span>
              </h4>
            ) : (
              <h4>
                <span className="choose-nfl" onClick={() => setLeague('nfl')}>
                  NFL
                </span>
                <span
                  style={{ color: 'gray' }}
                  className="choose-epl"
                  onClick={() => setLeague('epl')}
                >
                  , English Premier League
                </span>
              </h4>
            )}

            <p>Spread</p>
            <p>Moneyline</p>
            <p>Total</p>
          </div>
          <Game
            games={games}
            handleBet={handleBet}
            predictedTeam={predictedTeam}
            setPredictedTeam={setPredictedTeam}
            points={points}
            setPoints={setPoints}
            setGameId={setGameId}
          />
        </section>
      </div>
      <BetSlip
        betSlipOpen={betSlipOpen}
        odds={odds}
        betDetails={betDetails}
        predictedTeam={predictedTeam}
        betType={betType}
        points={points}
        user={user}
        gameId={gameId}
        gamesInDb={gamesInDb}
        getAllGames={getAllGames}
      />
    </div>
  )
}

export default GamesList
