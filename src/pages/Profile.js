import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Client from '../services/api'
import ActiveBet from '../components/ActiveBet'
import SettledBet from '../components/SettledBet'

const Profile = ({ user }) => {
  let navigate = useNavigate()

  const [activeBets, setActiveBets] = useState([])
  const [settledBets, setSettledBets] = useState([])

  const getBets = async () => {
    let activeBetsArray = []
    let settledBetsArray = []

    if (user) {
      let res = await Client.get(`/bets/users/${user.id}`)
      // console.log(res.data)
      res.data.forEach((game) => {
        if (game.inProgress !== false) {
          activeBetsArray.push(game)
        } else {
          settledBetsArray.push(game)
        }
      })
      setActiveBets(activeBetsArray)
      setSettledBets(settledBetsArray)
    }
  }

  useEffect(() => {
    getBets()
  }, [])

  return (
    <div>
      {user ? <Nav user={user} /> : null}
      <h2>My Bets</h2>
      <h3>Active</h3>
      <ActiveBet activeBets={activeBets} />
      <h3>Settled</h3>
      <SettledBet settledBets={settledBets} />
    </div>
  )
}

export default Profile
