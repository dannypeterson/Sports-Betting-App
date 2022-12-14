import axios from 'axios'
import { useState, useEffect } from 'react'

const CheckWinner = ({ gamesInDb, settledBets }) => {
  const getWinner = () => {
    settledBets.forEach((bet) => {
      let winner

      if (bet.type === 'moneyline') {
        // let teamsObj = {
        //   homeTeam: {
        //     name: gamesInDb[7].home_team,
        //     score: gamesInDb[7].home_team_score
        //   },
        //   awayTeam: {
        //     name: gamesInDb[7].away_team,
        //     score: gamesInDb[7].away_team_score
        //   }
        // }

        // let winningScore = Math.max(
        //   parseInt(gamesInDb[7].away_team_score),
        //   parseInt(gamesInDb[7].home_team_score)
        // )

        if (
          parseInt(gamesInDb[7].away_team_score) >
          parseInt(gamesInDb[7].home_team_score)
        ) {
          winner = gamesInDb[7].away_team
        } else {
          winner = gamesInDb[7].home_team
        }

        console.log(winner)
      }
    })
  }

  useEffect(() => {
    getWinner()
  }, [])
  return <div>a</div>
}

export default CheckWinner
