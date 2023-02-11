import { useNavigate } from 'react-router-dom'
import Client from '../services/api'

const ActiveBet = ({ activeBets }) => {
  let navigate = useNavigate()

  const deleteBet = async (bet) => {
    await Client.delete(`/bets/${bet.id}`)
  }

  return (
    <div className="active-bets">
      <div className="profile-bets">
        {activeBets?.reverse().map((bet) => (
          <div className="profile-bets-map" key={bet.id}>
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
                {bet.Game?.away_team} @ {bet.Game?.home_team}
              </p>
              <p>{bet.Game?.date}</p>
            </div>
            <div onClick={() => deleteBet(bet)} className="delete-bet">
              Cancel
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActiveBet
