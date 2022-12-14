import { useState, useEffect } from 'react'

const CheckTotal = ({ gamesInDb, bet, user }) => {
  const [wonBet, setWonBet] = useState(false)

  const getWinner = () => {
    let winner

    //first need to match up the bet id with the game id in gamesInDb

    let matchedGame = gamesInDb.find((game) => game.id === bet.Game.id)
    console.log(matchedGame)

    let totalScore =
      parseInt(matchedGame.away_team_score) +
      parseInt(matchedGame.home_team_score)

    if (bet.team == 'Over' && totalScore > bet.points) {
      console.log('over hit')
      setWonBet(true)
    } else if (bet.team == 'Under' && totalScore < bet.points) {
      console.log('under hit')
      setWonBet(true)
    } else {
      console.log('totals bet did not hit')
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

export default CheckTotal
