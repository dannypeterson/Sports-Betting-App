const AwaySpread = ({ game, handleBet }) => {
  return (
    <div className="game-spread">
      <div
        className="away-spread"
        tabIndex={1}
        onClick={(e) => handleBet(e, game)}
        id={game.away_spread.price}
      >
        <p>{game.away_spread.points}</p>
        <p className="game-spread-price">{game.away_spread.price}</p>
      </div>
    </div>
  )
}

export default AwaySpread
