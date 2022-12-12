import { useState } from 'react'

import AwayMoneyline from './AwayMoneyline'
import AwaySpread from './AwaySpread'
import Over from './Over'

import HomeMoneyline from './HomeMoneyline'
import HomeSpread from './HomeSpread'
import Under from './Under'

const Game = ({
  games,
  handleBet,
  predictedTeam,
  setPredictedTeam,
  setBetType,
  points,
  setPoints
}) => {
  return (
    <div className="game-map-container">
      {games.map((game) => (
        <div className="game-map" key={game.id}>
          <div className="away-team">
            <h3>{game.away_team}</h3>
            <AwaySpread
              game={game}
              handleBet={handleBet}
              predictedTeam={predictedTeam}
              setPredictedTeam={setPredictedTeam}
              points={points}
              setPoints={setPoints}
            />
            <AwayMoneyline
              game={game}
              handleBet={handleBet}
              predictedTeam={predictedTeam}
              setPredictedTeam={setPredictedTeam}
            />
            {game.over ? (
              <Over
                game={game}
                handleBet={handleBet}
                predictedTeam={predictedTeam}
                setPredictedTeam={setPredictedTeam}
                points={points}
                setPoints={setPoints}
              />
            ) : null}
          </div>

          <div className="home-team">
            <section>
              <h3>@ {game.home_team}</h3>
              <p>{game.date}</p>
            </section>
            <HomeSpread
              game={game}
              handleBet={handleBet}
              predictedTeam={predictedTeam}
              setPredictedTeam={setPredictedTeam}
              points={points}
              setPoints={setPoints}
            />
            <HomeMoneyline
              game={game}
              handleBet={handleBet}
              setPredictedTeam={setPredictedTeam}
              predictedTeam={predictedTeam}
            />
            {game.under ? (
              <Under
                game={game}
                handleBet={handleBet}
                predictedTeam={predictedTeam}
                setPredictedTeam={setPredictedTeam}
                points={points}
                setPoints={setPoints}
              />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Game
