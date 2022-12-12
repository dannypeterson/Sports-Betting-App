const Game = ({ games, handleBet }) => {
  return (
    <div className="game-map-container">
      {games.map((game) => (
        <div className="game-map" key={game.id}>
          <div className="game-description">
            <h3 className="team-names">{game.away_team}</h3>
          </div>

          <div className="game-spread">
            <div
              className="away-spread"
              tabIndex={1}
              onClick={handleBet}
              id={game.away_spread.price}
            >
              <p>{game.away_spread.points}</p>
              <p className="game-spread-price">{game.away_spread.price}</p>
            </div>
          </div>

          <div
            className="game-moneyline"
            tabIndex={2}
            id={game.away_ML}
            onClick={(e) => handleBet(e, game)}
          >
            <p>{game.away_ML}</p>
          </div>

          {game.over ? (
            <div
              className="game-totals"
              tabIndex={3}
              onClick={handleBet}
              id={game.over.price}
            >
              <p>O {game.over.points}</p>
              <p className="game-totals-price">{game.over.price}</p>
            </div>
          ) : null}

          <div className="game-description home">
            <h3 className="team-names">@ {game.home_team}</h3>
            <p>{game.date}</p>
          </div>

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

          <div
            className="game-moneyline"
            id={game.home_ML}
            onClick={handleBet}
            tabIndex="5"
          >
            <p>{game.home_ML}</p>
          </div>

          {game.under ? (
            <div
              className="game-totals"
              onClick={handleBet}
              id={game.under.price}
              tabIndex="6"
            >
              <p>U {game.under.points}</p>
              <p className="game-totals-price">{game.under.price}</p>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default Game
