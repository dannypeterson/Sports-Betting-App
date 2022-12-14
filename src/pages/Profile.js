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
      // console.log(res.data)
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
    <div>
      {user ? <Nav user={user} /> : null}
      <h2>My Bets</h2>
      <button onClick={() => updateGames()}>Check Scores</button>
      <div className="bet-status-header">
        <h3 onClick={() => toggleStateTrue()}>Active</h3>
        <h3 onClick={() => toggleStateFalse()}>Settled</h3>
      </div>

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
