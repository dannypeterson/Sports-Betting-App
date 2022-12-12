import { useState } from 'react'

const AwayMoneyline = ({
  game,
  handleBet,
  setPredictedTeam,
  predictedTeam,
  setGameId
}) => {
  const handleMoneyline = (e) => {
    setGameId(game.id)
    setPredictedTeam(game.away_team)
    handleBet(e, game, 'moneyline', predictedTeam)
  }

  return (
    <div>
      <div
        className="game-moneyline"
        tabIndex={2}
        id={game.away_ML}
        onClick={(e) => handleMoneyline(e)}
        // onClick={(e) => handleBet(e, game, 'moneyline', 'arizone')}
      >
        <p>{game.away_ML}</p>
      </div>
    </div>
  )
}

export default AwayMoneyline
