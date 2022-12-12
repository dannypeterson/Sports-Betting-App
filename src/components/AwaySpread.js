import { useState } from 'react'

const AwaySpread = ({
  game,
  handleBet,
  predictedTeam,
  setPredictedTeam,
  points,
  setPoints
}) => {
  const handleSpread = (e) => {
    setPredictedTeam(game.away_team)
    setPoints(game.away_spread.points)
    console.log(points)
    handleBet(e, game, 'spread', predictedTeam, points)
  }

  return (
    <div className="game-spread">
      <div
        className="away-spread"
        tabIndex={1}
        onClick={(e) => handleSpread(e)}
        id={game.away_spread.price}
      >
        <p>{game.away_spread.points}</p>
        <p className="game-spread-price">{game.away_spread.price}</p>
      </div>
    </div>
  )
}

export default AwaySpread
