import { useState } from 'react'

const BetSlip = ({
  betSlipOpen,
  odds,
  betDetails,
  predictedTeam,
  betType,
  points
}) => {
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
            <button className="submit-bet-button">Place bet</button>
          </form>
        </div>
      ) : null}
    </div>
  )
}

export default BetSlip
