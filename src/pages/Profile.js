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
      <header className="nav">
        <img
          src="../../assets/images/logo.png"
          alt="logo"
          className="logo"
        ></img>
        <nav>
          <ul className="nav_links">
            <li onClick={() => navigate('/games')}>View Games</li>
            <li>@{user.username}</li>
            <li>
              ${user.balance} <button>Add Funds</button>
            </li>
          </ul>
        </nav>
      </header>
      <h2>My Bets</h2>
      <div className="profile-bets">
        {myBets.map((bet) => (
          <div className="bets-map" key={bet.game_id}>
            <h2>{bet.game_id}</h2>
            <h4>Type: {bet.type}</h4>
            <h4>Wager: {bet.amount}</h4>
            <h3>Payout: {bet.payout}</h3>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profile
