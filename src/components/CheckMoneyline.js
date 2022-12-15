import axios from 'axios'
import { useState, useEffect } from 'react'

const CheckWinner = ({ gamesInDb, user, bet }) => {
  const [wonBet, setWonBet] = useState(false)

  const getWinner = () => {
    let winner

    //first need to match up the bet id with the game id in gamesInDb
    let matchedGame = gamesInDb.find((game) => game.id === bet.Game.id)

    if (
      parseInt(matchedGame?.away_team_score) >
      parseInt(matchedGame?.home_team_score)
    ) {
      winner = matchedGame.away_team
    } else {
      winner = matchedGame.home_team
    }
    if (winner === bet.team) {
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
