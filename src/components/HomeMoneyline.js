import { useState } from 'react'

const HomeMoneyline = ({ game, handleBet }) => {
  const [predictedWinner, setPredictedWinner] = useState(null)
  const [betType, setBetType] = useState(null)

  const handleMoneyline = (e, info) => {
    console.log(e.target.id)
    console.log(info)
  }

  return (
    <div>
      <div
        className="game-moneyline"
        id={game.home_ML}
        onClick={handleBet}
        tabIndex="5"
      >
        <p>{game.home_ML}</p>
      </div>
    </div>
  )
}

export default HomeMoneyline
