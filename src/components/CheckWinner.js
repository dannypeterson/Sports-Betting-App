import userEvent from '@testing-library/user-event'
import axios from 'axios'
import { useState, useEffect } from 'react'

const CheckWinner = ({ gamesInDb, settledBets, user }) => {
  const [winner, setWinner] = useState(null)
  const [wonBet, setWonBet] = useState(false)

  const getWinner = () => {
    settledBets.forEach((bet) => {
      if (bet.type === 'moneyline') {
        if (
          parseInt(gamesInDb[7].away_team_score) >
          parseInt(gamesInDb[7].home_team_score)
        ) {
          setWinner(gamesInDb[7].away_team)
        } else {
          setWinner(gamesInDb[7].home_team)
        }
        if (winner == settledBets.team) {
          console.log('moneyline hit')
          user.balance = user.balance + bet.to_win
          setWonBet(true)
          console.log('Balance has increased')
          console.log(user.balance)
        } else {
          console.log('Bet did not hit')
          console.log('Balance has decreased')
          console.log(user.balance)
        }
      }
      // else if (bet.type === 'spread') {

      // }
    })
  }

  useEffect(() => {
    getWinner()
  }, [])
  return (
    <div>
      {wonBet ? (
        <p className="bet-win-condition">WON</p>
      ) : (
        <p className="bet-lose-condition">LOST</p>
      )}
    </div>
  )
}

export default CheckWinner
