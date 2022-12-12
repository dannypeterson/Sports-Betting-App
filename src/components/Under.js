const Under = ({
  game,
  handleBet,
  predictedTeam,
  setPredictedTeam,
  points,
  setPoints,
  setGameId
}) => {
  const handleUnder = (e) => {
    setGameId(game.id)
    setPredictedTeam('Under')
    setPoints(game.under.points)
    handleBet(e, game, 'total match points', predictedTeam, points)
  }
  return (
    <div
      className="game-totals"
      onClick={(e) => handleUnder(e)}
      id={game.under.price}
      tabIndex="6"
    >
      <p>U {game.under.points}</p>
      <p className="game-totals-price">{game.under.price}</p>
    </div>
  )
}

export default Under
