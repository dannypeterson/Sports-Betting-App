import { useState, useEffect } from 'react'

const CheckSpread = ({ gamesInDb, bet, user }) => {
  const [wonBet, setWonBet] = useState(false)

  const getWinner = () => {
    let winner

    //first need to match up the bet id with the game id in gamesInDb
    let matchedGame = gamesInDb.find((game) => game.id === bet.Game.id)

    let gameSpread = Math.abs(
      matchedGame.away_team_score - matchedGame.home_team_score
    )
    if (bet.points > 0 && gameSpread < bet.points) {
      console.log('bet hit')
      setWonBet(true)
    } else {
      console.log('not hit')
      setWonBet(false)
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

export default CheckSpread
