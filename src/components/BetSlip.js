import { useState } from 'react'

const BetSlip = ({ betSlipOpen, odds, betDetails }) => {
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
          {/* <h3>{predictedWinner}</h3>
          <p>{betType}</p> */}
          <p>
            {betDetails.away_team} @ {betDetails.home_team}
          </p>
          <p>{odds}</p>
          <form>
            <input
              type="text"
              placeholder="Enter wager here"
              onChange={handleWager}
            />
            <button className="submit-bet-button">Place bet</button>
          </form>
          <p>To win: ${payout}</p>
        </div>
      ) : null}
    </div>
  )
}

export default BetSlip
