import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const SelectLeague = () => {
  const navigate = useNavigate()

  return (
    <div className="select-league-container">
      <h2>Select your league</h2>
      <button
        id="nfl"
        className="nfl-league"
        // onClick={setLeague('nfl')}
        // onClick={navigate(`/games/${id}`)}
      >
        NFL
      </button>
      <button
        id="epl"
        className="epl-league"
        // onClick={setLeague('epl')}
        // onClick={navigate(`/games/${id}`)}
      >
        English Premier League
      </button>
    </div>
  )
}

export default SelectLeague
