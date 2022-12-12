const HomeSpread = ({ game, handleBet }) => {
  return (
    <div className="game-spread">
      <div
        className="home-spread"
        tabIndex={4}
        onClick={handleBet}
        id={game.home_spread.price}
      >
        <p>{game.home_spread.points}</p>
        <p className="game-spread-price">{game.home_spread.price}</p>
      </div>
    </div>
  )
}

export default HomeSpread
