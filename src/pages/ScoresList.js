import axios from 'axios'
import { useState, useEffect } from 'react'

import Score from '../components/Score'
import Nav from '../components/Nav'
import Client from '../services/api'

const ScoresList = ({ user, gamesInDb, setGamesInDb }) => {
  const API_KEY = process.env.REACT_APP_ODDS_API_KEY

  const [scores, setScores] = useState(null)

  const getScores = async () => {
    let scoresArray = []

    // external api game scores
    let nflScores = await axios.get(
      `https://api.the-odds-api.com/v4/sports/americanfootball_nfl/scores/?apiKey=${API_KEY}&daysFrom=3&dateFormat=unix`
    )

    let eplScores = await axios.get(
      `https://api.the-odds-api.com/v4/sports/soccer_epl/scores/?apiKey=${API_KEY}&daysFrom=3&dateFormat=unix`
    )

    eplScores.data.forEach((game) => {
      let scoreDetails = {}
      let gamesScores = game.scores

      // only some games have scores so I only want those
      if (gamesScores) {
        scoreDetails.gameId = game.id
        scoreDetails.completed = game.completed

        // grabbing away team name and scores in an object, pushing to scoreDetails {}
        let awayTeamObject = gamesScores.filter(
          (team) => team.name === game.away_team
        )
        scoreDetails.away_team = awayTeamObject

        // grabbing home team name and scores in one object, pushing to scoreDetails {}
        let homeTeamObject = gamesScores.filter(
          (team) => team.name === game.home_team
        )
        scoreDetails.home_team = homeTeamObject
      }

      //find scoreDetails {} that have scores (not empty) and push to scoresArray
      if (Object.keys(scoreDetails).length !== 0) {
        scoresArray.push(scoreDetails)

        let gamesArray = [...gamesInDb]

        // if the id is already in the db === api call game id AND game is completed
        gamesInDb?.forEach((game, index) => {
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

            gamesArray.splice(index, 1, updatedGame)
            setGamesInDb(gamesArray)
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
    <div className="scores-list-page">
      {user ? <Nav user={user} /> : null}
      <h2 className="scores-page-title">Past weekend Scores</h2>
      <div className="scores-container">
        <div className="scores-header"></div>
        <Score scores={scores} />
      </div>
    </div>
  )
}

export default ScoresList
