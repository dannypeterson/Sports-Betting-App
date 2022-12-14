import { axios } from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Client from '../services/api'

const BetSlip = ({
  betSlipOpen,
  odds,
  betDetails,
  predictedTeam,
  betType,
  points,
  user,
  gameId,
  gamesInDb
}) => {
  let navigate = useNavigate()

  let gameExists

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

  let betSlip = {
    user_id: user?.id,
    game_id: gameId,
    type: betType,
    team: predictedTeam,
    odds: odds,
    points: points,
    wager: wager,
    to_win: payout
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    gamesInDb?.forEach((game) => {
      console.log(game.id)
      // changed betDetails.id to gameId state
      if (game.id == gameId) {
        gameExists = true
      }
    })

    if (gameExists) {
      let bet = await Client.post(`/bets`, betSlip)
    } else {
      let game = await Client.post(`/games`, betDetails)
      let bet = await Client.post(`/bets`, betSlip)
    }
    // console.log(gameExists)

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
                {predictedTeam} {points ? points : null}
              </h3>
              <p>{betType?.toUpperCase()}</p>
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
