const Scores = ({ scores }) => {
  return (
    <div className="scores-grid">
      {scores?.map((score) => (
        <div className="scores-map" key={score.gameId}>
          <div>
            <section className="away-scores">
              <img
                className="team-logo"
                src={`../../assets/EPL-Team-Logos/${score.away_team[0].name}.png`}
              ></img>
              <h3>
                {score.away_team[0].name}{' '}
                <span className="score">{score.away_team[0].score}</span>
              </h3>
            </section>
            <section className="home-scores">
              <img
                className="team-logo"
                src={`../../assets/EPL-Team-Logos/${score.home_team[0].name}.png`}
              ></img>
              <h3>
                {score.home_team[0].name}{' '}
                <span className="score">{score.home_team[0].score}</span>
              </h3>
            </section>
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
