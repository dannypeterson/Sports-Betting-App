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
  setPoints,
  setGameId
}) => {
  return (
    <div className="game-map-container">
      {games.map((game) => (
        <div className="game-map" key={game.id}>
          <div className="away-team">
            <div className="away-team-info">
              {/* <img className="team-logo" src={awayLogo}></img> */}
              <h3>{game.away_team}</h3>
            </div>
            <AwaySpread
              game={game}
              handleBet={handleBet}
              predictedTeam={predictedTeam}
              setPredictedTeam={setPredictedTeam}
              points={points}
              setPoints={setPoints}
              setGameId={setGameId}
            />
            <AwayMoneyline
              game={game}
              handleBet={handleBet}
              predictedTeam={predictedTeam}
              setPredictedTeam={setPredictedTeam}
              setGameId={setGameId}
            />
            {game.over ? (
              <Over
                game={game}
                handleBet={handleBet}
                predictedTeam={predictedTeam}
                setPredictedTeam={setPredictedTeam}
                points={points}
                setPoints={setPoints}
                setGameId={setGameId}
              />
            ) : null}
          </div>

          <div className="home-team">
            <section className="home-team-info">
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
              setGameId={setGameId}
            />
            <HomeMoneyline
              game={game}
              handleBet={handleBet}
              setPredictedTeam={setPredictedTeam}
              predictedTeam={predictedTeam}
              setGameId={setGameId}
            />
            {game.under ? (
              <Under
                game={game}
                handleBet={handleBet}
                predictedTeam={predictedTeam}
                setPredictedTeam={setPredictedTeam}
                points={points}
                setPoints={setPoints}
                setGameId={setGameId}
              />
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Game
