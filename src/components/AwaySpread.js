import { useState } from 'react'

const AwaySpread = ({
  game,
  handleBet,
  predictedTeam,
  setPredictedTeam,
  points,
  setPoints,
  setGameId
}) => {
  const handleSpread = (e) => {
    setGameId(game.id)
    setPredictedTeam(game.away_team)
    setPoints(game.away_spread.points)
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
        {game.away_spread.points > 0 ? (
          <p>+{game.away_spread.points}</p>
        ) : (
          <p>{game.away_spread.points}</p>
        )}
        {game.away_spread.price > 0 ? (
          <p className="game-spread-price">+{game.away_spread.price}</p>
        ) : (
          <p className="game-spread-price">{game.away_spread.price}</p>
        )}
      </div>
    </div>
  )
}

export default AwaySpread
