const Under = ({ game, handleBet }) => {
  return (
    <div
      className="game-totals"
      onClick={handleBet}
      id={game.under.price}
      tabIndex="6"
    >
      <p>U {game.under.points}</p>
      <p className="game-totals-price">{game.under.price}</p>
    </div>
  )
}

export default Under
