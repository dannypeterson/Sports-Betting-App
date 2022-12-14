import axios from 'axios'
import { useState, useEffect } from 'react'

import Scores from '../components/Score'
import Nav from '../components/Nav'
import Client from '../services/api'

const ScoresList = ({ user, gamesInDb, setGamesInDb }) => {
  const API_KEY = process.env.REACT_APP_ODDS_API_KEY

  const [scores, setScores] = useState([])

  const updateGames = async () => {
    await Client.put(`/games`, gamesInDb)
    console.log('ran updateGames function')
  }

  const getScores = async () => {
    let scoresArray = []
    let res = await axios.get(
      `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/scores/?apiKey=${API_KEY}&daysFrom=3&dateFormat=unix`
    )
    // console.log(res.data)
    res.data.forEach((game) => {
      let scoreDetails = {}
      let gamesScores = game.scores

      if (gamesScores) {
        scoreDetails.gameId = game.id
        scoreDetails.completed = game.completed

        let awayTeamObject = gamesScores.filter(
          (team) => team.name === game.away_team
        )
        scoreDetails.away_team = awayTeamObject

        let homeTeamObject = gamesScores.filter(
          (team) => team.name === game.home_team
        )
        scoreDetails.home_team = homeTeamObject
      }

      if (Object.keys(scoreDetails).length !== 0) {
        scoresArray.push(scoreDetails)

        let gamesArray = [...gamesInDb]

        gamesInDb?.forEach(async (game, index) => {
          if (
            game.id === scoreDetails.gameId &&
            scoreDetails.completed === true
          ) {
            console.log(`matched id found ${game.id}`)

            let updatedGame = {
              ...game,
              inProgress: false
            }

            gamesArray.splice(index, 1, updatedGame)
            // console.log(gamesArray)
            setGamesInDb(gamesArray)

            await updateGames()
            console.log('finished')
          }
        })
      }
    })

    setScores(scoresArray)
  }

  useEffect(() => {
    getScores()
  }, [])

  return (
    <div className="scores-container">
      {user ? <Nav user={user} /> : null}

      <h2>Scores</h2>
      <Scores scores={scores} />
    </div>
  )
}

export default ScoresList
