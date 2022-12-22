const Scores = ({ scores }) => {
  return (
    <div className="scores-grid">
      {scores?.map((score) => (
        <div className="scores-map" key={score.gameId}>
          <div>
            <h3>
              {score.away_team[0].name}{' '}
              <span className="score">{score.away_team[0].score}</span>
            </h3>
            <h3>
              @ {score.home_team[0].name}{' '}
              <span className="score">{score.home_team[0].score}</span>
            </h3>
          </div>
          <p>
            {score.completed === true ? (
              <span className="final-score">FINAL</span>
            ) : (
              <span className="live-game">LIVE</span>
            )}
          </p>
        </div>
      ))}
    </div>
  )
}

export default Scores
