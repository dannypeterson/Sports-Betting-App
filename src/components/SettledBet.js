import CheckWinner from './CheckWinner'

const SettledBet = ({ settledBets, gamesInDb, user }) => {
  return (
    <div className="settled-bets">
      <div className="profile-bets">
        {settledBets?.map((bet) => (
          <div className="profile-bets-map" key={bet.id}>
            <CheckWinner
              gamesInDb={gamesInDb}
              settledBets={settledBets}
              user={user}
            />
            <div className="profile-bet-details">
              <div>
                <h3>{bet.team}</h3>
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

export default SettledBet
