const HomeSpread = ({
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
    setPredictedTeam(game.home_team)
    setPoints(game.home_spread.points)
    handleBet(e, game, 'spread', predictedTeam, points)
  }
  return (
    <div className="game-spread">
      <div
        className="home-spread"
        tabIndex={4}
        onClick={(e) => handleSpread(e)}
        id={game.home_spread.price}
      >
        {game.home_spread.points > 0 ? (
          <p>+{game.home_spread.points}</p>
        ) : (
          <p>{game.home_spread.points}</p>
        )}
        {game.home_spread.price > 0 ? (
          <p className="game-spread-price">+{game.home_spread.price}</p>
        ) : (
          <p className="game-spread-price">{game.home_spread.price}</p>
        )}
      </div>
    </div>
  )
}

export default HomeSpread
