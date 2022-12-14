const Scores = ({ scores }) => {
  return (
    <div>
      {scores?.map((score) => (
        <div className="scores-map" key={score.gameId}>
          <h3>
            {score.away_team[0].name} {score.away_team[0].score} @{' '}
            {score.home_team[0].name} {score.home_team[0].score}
          </h3>
          <p>
            {score.completed === true ? (
              <span>FINAL</span>
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
