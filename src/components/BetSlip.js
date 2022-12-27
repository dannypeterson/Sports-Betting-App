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
  gamesInDb,
  getAllGames
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
      // console.log(game.id)
      if (game.id == gameId) {
        gameExists = true
      }
    })

    if (gameExists) {
      let bet = await Client.post(`/bets`, betSlip)
      // console.log('game exists already')
    } else {
      let game = await Client.post(`/games`, betDetails)
      let bet = await Client.post(`/bets`, betSlip)
      getAllGames()
    }

    user.balance = user.balance - wager
    // console.log('Bet has been placed')
    // console.log(user.balance)
    navigate('/profile')
  }

  return (
    <div className="betslip">
      {betSlipOpen ? (
        <div>
          <h2>Bet Slip: </h2>
          <div className="bet-header">
            <div>
              {betType === 'moneyline' ? (
                <h3>{predictedTeam}</h3>
              ) : (
                <h3>
                  {predictedTeam} {points}
                </h3>
              )}
              <p>{betType?.toUpperCase()}</p>
              <p>
                {betDetails.away_team} @ {betDetails.home_team}
              </p>
            </div>
            <div className="bet-odds">
              {odds > 0 ? <h4>+{odds}</h4> : <h4>{odds}</h4>}
            </div>
          </div>
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
