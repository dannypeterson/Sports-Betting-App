const Over = ({
  game,
  handleBet,
  setPredictedTeam,
  predictedTeam,
  points,
  setPoints,
  setGameId
}) => {
  const handleOver = (e) => {
    setGameId(game.id)
    setPredictedTeam('Over')
    setPoints(game.over.points)
    handleBet(e, game, 'total match points', predictedTeam, points)
  }

  return (
    <div
      className="game-totals"
      tabIndex={3}
      onClick={(e) => handleOver(e)}
      id={game.over.price}
    >
      <p>O {game.over.points}</p>
      <p className="game-totals-price">{game.over.price}</p>
    </div>
  )
}

export default Over
