const Nav = ({ user }) => {
  return (
    <header className="nav">
      <img src="alt" alt="logo" className="logo"></img>
      <nav>
        <ul className="nav_links">
          <li>Username</li>
          <li>Balance</li>
        </ul>
      </nav>
    </header>
  )
}

export default Nav
