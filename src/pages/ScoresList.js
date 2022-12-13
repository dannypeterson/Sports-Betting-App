import axios from 'axios'
import { useState, useEffect } from 'react'

import Scores from '../components/Score'

const ScoresList = () => {
  const API_KEY = process.env.REACT_APP_ODDS_API_KEY

  const [scores, setScores] = useState([])

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
        console.log(scoreDetails)
        scoresArray.push(scoreDetails)
      }
    })

    setScores(scoresArray)
  }

  useEffect(() => {
    getScores()
  }, [])

  return (
    <div className="scores-container">
      <h2>Scores</h2>
      <Scores scores={scores} />
    </div>
  )
}

export default ScoresList
