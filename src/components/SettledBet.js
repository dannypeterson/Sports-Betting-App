import CheckMoneyline from './CheckMoneyline'
import CheckSpread from './CheckSpread'
import CheckTotal from './CheckTotal'
import { useState } from 'react'

const SettledBet = ({ settledBets, gamesInDb, user }) => {
  return (
    <div className="settled-bets">
      <div className="profile-bets">
        {settledBets?.reverse().map((bet) => (
          <div className="profile-bets-map" key={bet.id}>
            {bet.type === 'moneyline' ? (
              <CheckMoneyline gamesInDb={gamesInDb} user={user} bet={bet} />
            ) : null}

            {bet.type === 'spread' ? (
              <CheckSpread gamesInDb={gamesInDb} user={user} bet={bet} />
            ) : null}

            {bet.type === 'total match points' ? (
              <CheckTotal gamesInDb={gamesInDb} user={user} bet={bet} />
            ) : null}

            <div className="profile-bet-details">
              <div className="profile-bet-header">
                {bet.points > 0 ? (
                  <h3>
                    {bet.team} +{bet.points}
                  </h3>
                ) : (
                  <h3>
                    {bet.team} {bet.points}
                  </h3>
                )}
                <p>{bet.type.toUpperCase()}</p>
              </div>
              <div>
                {bet.odds > 0 ? <h3>+{bet.odds}</h3> : <h3>{bet.odds}</h3>}
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
