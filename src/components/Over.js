const Over = ({ game, handleBet }) => {
  return (
    <div
      className="game-totals"
      tabIndex={3}
      onClick={(e) => handleBet(e, game)}
      id={game.over.price}
    >
      <p>O {game.over.points}</p>
      <p className="game-totals-price">{game.over.price}</p>
    </div>
  )
}

export default Over
