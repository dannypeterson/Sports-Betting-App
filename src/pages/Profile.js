import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Client from '../services/api'
import ActiveBet from '../components/ActiveBet'
import SettledBet from '../components/SettledBet'

const Profile = ({ user, gamesInDb, updateGames }) => {
  let navigate = useNavigate()

  const [activeBets, setActiveBets] = useState([])
  const [settledBets, setSettledBets] = useState([])
  const [activeState, setActiveState] = useState(true)

  const getBets = async () => {
    let activeBetsArray = []
    let settledBetsArray = []

    if (user) {
      let res = await Client.get(`/bets/users/${user.id}`)
      res.data.forEach((game) => {
        if (game.Game.inProgress !== false) {
          activeBetsArray.push(game)
        } else {
          settledBetsArray.push(game)
        }
      })
      setActiveBets(activeBetsArray)
      setSettledBets(settledBetsArray)
    }
  }

  const toggleStateFalse = () => {
    setActiveState(false)
  }

  const toggleStateTrue = () => {
    setActiveState(true)
  }

  useEffect(() => {
    getBets()
  }, [])

  return (
    <div className="profile-page">
      {user ? <Nav user={user} /> : null}
      <div className="profile-header">
        <h2>My Bets</h2>
        <button className="update-games-button" onClick={() => updateGames()}>
          Check Scores
        </button>
      </div>
      {activeState ? (
        <div className="bet-status-header">
          <div className="active-bets-tab">
            <h3 onClick={() => toggleStateTrue()}>Active</h3>
          </div>
          <div className="settled-bets-tab">
            <h3
              className="status-selected"
              tabIndex={9}
              onClick={() => toggleStateFalse()}
            >
              Settled
            </h3>
          </div>
        </div>
      ) : (
        <div className="bet-status-header">
          <div className="active-bets-tab">
            <h3 className="status-selected" onClick={() => toggleStateTrue()}>
              Active
            </h3>
          </div>
          <div className="settled-bets-tab">
            <h3 tabIndex={9} onClick={() => toggleStateFalse()}>
              Settled
            </h3>
          </div>
        </div>
      )}

      {activeState ? (
        <ActiveBet activeBets={activeBets} />
      ) : (
        <SettledBet
          settledBets={settledBets}
          gamesInDb={gamesInDb}
          user={user}
        />
      )}
    </div>
  )
}

export default Profile
