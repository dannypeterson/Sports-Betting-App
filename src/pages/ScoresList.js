import axios from 'axios'
import { useState, useEffect } from 'react'

import Scores from '../components/Score'
import Nav from '../components/Nav'
import Client from '../services/api'

const ScoresList = ({ user, gamesInDb, setGamesInDb }) => {
  const API_KEY = process.env.REACT_APP_ODDS_API_KEY

  const [scores, setScores] = useState(null)

  const updateGames = async () => {
    await Client.put(`/games`, gamesInDb)
    console.log('ran updateGames function')
  }

  const getScores = async () => {
    let scoresArray = []

    // external api game scores
    let res = await axios.get(
      `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/scores/?apiKey=${API_KEY}&daysFrom=3&dateFormat=unix`
    )
    // console.log(res.data)
    res.data.forEach((game) => {
      let scoreDetails = {}
      let gamesScores = game.scores

      // only some games have scores so I only want those
      if (gamesScores) {
        scoreDetails.gameId = game.id
        scoreDetails.completed = game.completed

        let awayTeamObject = gamesScores.filter(
          (team) => team.name === game.away_team
        )
        scoreDetails.away_team = awayTeamObject
        // console.log(scoreDetails.away_team)

        let homeTeamObject = gamesScores.filter(
          (team) => team.name === game.home_team
        )
        scoreDetails.home_team = homeTeamObject
        // console.log(scoreDetails.home_team)
      }

      if (Object.keys(scoreDetails).length !== 0) {
        scoresArray.push(scoreDetails)

        let gamesArray = [...gamesInDb]

        gamesInDb?.forEach((game, index) => {
          // if the id already in the db === api call game id AND game is completed
          if (
            game?.id === scoreDetails.gameId &&
            scoreDetails.completed === true
          ) {
            console.log(`matched id found ${game.id}`)

            let updatedGame = {
              ...game,
              inProgress: false,
              away_team_score: scoreDetails.away_team[0].score,
              home_team_score: scoreDetails.home_team[0].score
            }
            // console.log(updatedGame)

            gamesArray.splice(index, 1, updatedGame)
            setGamesInDb(gamesArray)
            console.log(gamesInDb)

            // updateGames()
          }
        })
      }
    })
    // console.log(scoresArray)
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
