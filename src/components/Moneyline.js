const Moneyline = ({ game, handleBet }) => {
  return (
    <div
      className="game-moneyline"
      tabIndex={2}
      id={game.away_ML}
      onClick={(e) => handleBet(e, game)}
    >
      <p>{game.away_ML}</p>
    </div>
  )
}

export default Moneyline
