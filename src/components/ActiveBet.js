const ActiveBet = ({ myBets }) => {
  return (
    <div className="active-bets">
      <div className="profile-bets">
        {myBets?.map((bet) => (
          <div className="profile-bets-map" key={bet.id}>
            <div className="profile-bet-details">
              <div>
                <h3>
                  {bet.team} {bet.points}
                </h3>
                <p>{bet.type.toUpperCase()}</p>
              </div>
              <div>
                <h3>{bet.odds}</h3>
              </div>
            </div>
            <div className="profile-bet-date">
              <p>
                {bet.Game.away_team} @ {bet.Game.home_team}
              </p>
              <p>{bet.Game.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActiveBet
