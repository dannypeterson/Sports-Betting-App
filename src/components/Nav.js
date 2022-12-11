import { useNavigate } from 'react-router-dom'

const Nav = ({ user }) => {
  let navigate = useNavigate()

  return (
    <header className="nav">
      <img src="alt" alt="logo" className="logo"></img>
      <nav>
        <ul className="nav_links">
          <li onClick={() => navigate('/profile')}>{user.username}</li>
          <li>${user.balance}</li>
        </ul>
      </nav>
    </header>
  )
}

export default Nav
