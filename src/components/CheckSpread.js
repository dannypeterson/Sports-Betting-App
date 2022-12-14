import { useState, useEffect } from 'react'

const CheckSpread = () => {
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
            return
          } else {
            console.log('Bet did not hit')
            console.log('Balance has decreased')
            console.log(user.balance)
            return
          }
        } else if (bet.type === 'spread') {
          let gameSpread = Math.abs(
            gamesInDb[8].away_team_score - gamesInDb[8].home_team_score
          )
          console.log(bet.points)
          let a = -2.5
          if (a > 0 && gameSpread < bet.points) {
            console.log('bet hit')
            setWonBet(true)
          } else {
            console.log('not hit')
            setWonBet(false)
          }
        }
      })
    }
  }
  return <div>abs</div>
}

export default CheckSpread
