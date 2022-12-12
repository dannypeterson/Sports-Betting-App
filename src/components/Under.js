const Under = ({ game, handleBet }) => {
  return (
    <div
      className="game-totals"
      onClick={(e) => handleBet(e, game)}
      id={game.under.price}
      tabIndex="6"
    >
      <p>U {game.under.points}</p>
      <p className="game-totals-price">{game.under.price}</p>
    </div>
  )
}

export default Under
