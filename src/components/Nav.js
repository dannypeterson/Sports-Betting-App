import { useNavigate } from 'react-router-dom'

const Nav = ({ user }) => {
  let navigate = useNavigate()

  return (
    <nav className="navbar">
      <img
        src="'../../assets/images/logo.png"
        alt="logo"
        className="logo"
      ></img>
      <div className="nav_links">
        <ul>
          <li onClick={() => navigate('/games')}>Sportsbook</li>
          <li onClick={() => navigate('/scores')}>Scores</li>
          <li onClick={() => navigate('/profile')}>@{user?.username}</li>
          <li>${user?.balance}</li>
          <li onClick={() => navigate('/logout')}>Logout</li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav
