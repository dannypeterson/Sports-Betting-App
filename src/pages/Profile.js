import Nav from '../components/Nav'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Client from '../services/api'

const Profile = ({ user }) => {
  let navigate = useNavigate()

  const [myBets, setMyBets] = useState()

  const getBets = async () => {
    let res = await Client.get(`/users/${user.id}`)
    console.log(res.data.Bets)
    setMyBets(res.data.Bets)
  }

  useEffect(() => {
    getBets()
  }, [])

  return (
    <div>
      {user ? <Nav user={user} /> : null}
      <h2>My Bets</h2>
      <div className="profile-bets">
        {/* {myBets.map((bet) => (
          <div className="bets-map" key={bet.game_id}>
            <h2>{bet.game_id}</h2>
            <h4>Type: {bet.type}</h4>
            <h4>Wager: {bet.amount}</h4>
            <h3>Payout: {bet.payout}</h3>
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default Profile
