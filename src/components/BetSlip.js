import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'

const BetSlip = ({
  betSlipOpen,
  odds,
  betDetails,
  predictedTeam,
  betType,
  points,
  user
}) => {
  let navigate = useNavigate()

  const [wager, setWager] = useState(null)
  const [payout, setPayout] = useState(0)

  const handleWager = (e) => {
    setWager(e.target.value)

    if (odds < 0) {
      let pay = Math.round((100 / odds) * wager * -1)
      setPayout(pay)
    } else {
      let pay = Math.round((odds / 100) * wager)
      setPayout(pay)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let res = await Client.post(`/games`, betDetails)
    user.balance = user.balance - wager
    console.log('Bet has been placed')
    console.log(user.balance)
  }

  return (
    <div className="betslip">
      {betSlipOpen ? (
        <div>
          <h2>Bet Slip: </h2>
          <div className="bet-header">
            <div>
              <h3>
                {predictedTeam} {points}
              </h3>
              <p>{betType.toUpperCase()}</p>
            </div>
            <div>
              <p>{odds}</p>
            </div>
          </div>
          <p>
            {betDetails.away_team} @ {betDetails.home_team}
          </p>
          <form className="betslip-form">
            <div className="form-inputs">
              <div className="bet-outer-container">
                <div className="bet-inner-container">
                  <span>WAGER</span>
                  <div>
                    <span>$</span>
                    <input
                      className="wager-input"
                      type="text"
                      onChange={handleWager}
                    />
                  </div>
                </div>
              </div>
              <div className="bet-outer-container">
                <div className="bet-inner-container">
                  <span>TO WIN</span>
                  <div>
                    <span>${payout}</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="submit-bet-button" onClick={handleSubmit}>
              Place bet
            </button>
          </form>
        </div>
      ) : null}
    </div>
  )
}

export default BetSlip
