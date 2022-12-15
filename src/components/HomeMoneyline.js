import { useState } from 'react'

const HomeMoneyline = ({
  game,
  handleBet,
  setPredictedTeam,
  predictedTeam,
  setGameId
}) => {
  const handleMoneyline = (e) => {
    setGameId(game.id)
    setPredictedTeam(game.home_team)
    handleBet(e, game, 'moneyline', predictedTeam)
  }

  return (
    <div>
      <div
        className="game-moneyline"
        id={game.home_ML}
        onClick={(e) => handleMoneyline(e)}
        tabIndex="5"
      >
        {game.home_ML > 0 ? <p>+{game.home_ML}</p> : game.home_ML}
      </div>
    </div>
  )
}

export default HomeMoneyline
