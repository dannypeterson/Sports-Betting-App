import { useNavigate } from 'react-router-dom'

const Nav = ({ user }) => {
  let navigate = useNavigate()

  return (
    <header className="nav-header">
      <img
        src="'../../assets/images/logo.png"
        alt="logo"
        className="logo"
      ></img>
      <nav>
        <ul className="nav_links">
          <li onClick={() => navigate('/games')}>Sportsbook</li>
          <li onClick={() => navigate('/scores')}>Scores</li>
          <li onClick={() => navigate('/profile')}>@{user?.username}</li>
          <li>${user?.balance}</li>
          <li onClick={() => navigate('/logout')}>Sign Out</li>
        </ul>
      </nav>
    </header>
  )
}

export default Nav
