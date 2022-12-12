const HomeSpread = ({
  game,
  handleBet,
  predictedTeam,
  setPredictedTeam,
  points,
  setPoints
}) => {
  const handleSpread = (e) => {
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
        <p>{game.home_spread.points}</p>
        <p className="game-spread-price">{game.home_spread.price}</p>
      </div>
    </div>
  )
}

export default HomeSpread
