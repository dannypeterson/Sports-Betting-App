import CheckMoneyline from './CheckMoneyline'
import CheckSpread from './CheckSpread'
import CheckTotal from './CheckTotal'
import { useState } from 'react'

const SettledBet = ({ settledBets, gamesInDb, user }) => {
  return (
    <div className="settled-bets">
      <div className="profile-bets">
        {settledBets?.map((bet) => (
          <div className="profile-bets-map" key={bet.id}>
            {bet.type === 'moneyline' ? (
              <CheckMoneyline
                gamesInDb={gamesInDb}
                settledBets={settledBets}
                user={user}
                bet={bet}
              />
            ) : null}

            {bet.type === 'spread' ? (
              <CheckSpread
                gamesInDb={gamesInDb}
                settledBets={settledBets}
                user={user}
              />
            ) : null}

            {bet.type === 'total match points' ? (
              <CheckTotal
                gamesInDb={gamesInDb}
                settledBets={settledBets}
                user={user}
              />
            ) : null}

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

export default SettledBet
