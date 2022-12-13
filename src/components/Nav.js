import { useNavigate } from 'react-router-dom'

const Nav = ({ user }) => {
  let navigate = useNavigate()

  return (
    <header className="nav">
      <img
        src="'../../assets/images/logo.png"
        alt="logo"
        className="logo"
      ></img>
      <nav>
        <ul className="nav_links">
          <li onClick={() => navigate('/scores')}>Scores</li>
          <li onClick={() => navigate('/profile')}>@{user.username}</li>
          <li>${user.balance}</li>
        </ul>
      </nav>
    </header>
  )
}

export default Nav
