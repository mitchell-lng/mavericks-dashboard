import './leaderboard.css'

import { Card } from '../../components'

import { useEffect } from 'react'

import { useData } from '../../../../hooks/DataContext'

import type { SeasonLog } from '../../../../utils/types'

const Leaderboard = () => {
  const { data } = useData();

  useEffect(() => {
    // Fetch leaderboard data when the component mounts
    // This is just a placeholder, replace with actual data fetching logic
  }, []);

  const getTopPlayersForStat = (field: keyof SeasonLog, reverse: boolean) => {
    return data.players?.sort((a, b) => reverse 
      ? (Number(a.seasonLog?.[field as keyof SeasonLog]) ?? 0) - (Number(b.seasonLog?.[field as keyof SeasonLog]) ?? 0) 
      : (Number(b.seasonLog?.[field as keyof SeasonLog]) ?? 0) - (Number(a.seasonLog?.[field as keyof SeasonLog]) ?? 0)
    ).slice(0, 10).map(player => ({
      playerId: player.playerId,
      name: player.playerBio.name,
      value: Number(player.seasonLog?.[field as keyof SeasonLog]) ?? 0,
    }));
  }

  const dict = {
    'Most Points Scored': getTopPlayersForStat('PTS', false),
    'Most Rebounds': getTopPlayersForStat('TRB', false),
    'Most Assists': getTopPlayersForStat('AST', false),
    'Most Steals': getTopPlayersForStat('STL', false),
    'Most Blocks': getTopPlayersForStat('BLK', false),
    'Least Turnovers': getTopPlayersForStat('TOV', true),
  }

  return (
    <>
      <h1>Leaderboard (average per game)</h1>
      <div className="leaderboard-container">
        <main className="leaderboard-main">
        {
          Object.entries(dict).map(([title, players], index) => (
            (
              <Card key={index}>
                <Card.Header>
                  <h2>{title}</h2>
                </Card.Header>
                <Card.Body>
                  <table>
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Points</th>
                      </tr>
                    </thead>
                    <tbody>
                        {players?.map((player, index) => (
                        <tr key={player.playerId}>
                          <td>#{index + 1}</td>
                          <td>{player.name}</td>
                          <td>{player.value ?? 0}</td>
                        </tr>
                        ))}
                    </tbody>
                  </table>
                </Card.Body>
              </Card>
            )
          ))
        }
        </main>
      </div>
    </>
  )
}

export default Leaderboard