const Scores = ({ scores }) => {
  return (
    <div>
      {scores.map((score) => (
        <div key={score.gameId}>
          <h3>
            {score.away_team[0].name} {score.away_team[0].score} @{' '}
            {score.home_team[0].name} {score.home_team[0].score}
          </h3>
        </div>
      ))}
    </div>
  )
}

export default Scores
