import './player.css'

import { Card } from '../../components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUserPlus, faPrint } from '@fortawesome/free-solid-svg-icons'
import { faFlag } from '@fortawesome/free-solid-svg-icons'
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons'

import { BarChart } from '@mui/x-charts/BarChart';

import type { FullPlayerData } from '../../../../utils/types'

import { useData } from '../../../../hooks/DataContext'

import { useLocation } from 'react-router-dom'

import { useEffect, useState } from 'react'

const Player = () => {
  const location = useLocation();

  const {data, addBookmark, removeBookmark} = useData();

  const playerId = location.pathname.split('/').pop();
  const playerData = data.players?.find((player) => player.playerId === Number(playerId));

  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    setIsBookmarked(data.bookmarks?.some((bookmark) => bookmark.playerId === Number(playerId)) || false);
  }, [data.bookmarks, playerId]);

  if (!playerData) {
    return <div>Player not found</div>;
  }

  const { playerBio, measurements, scoutRanking, gameLogs, seasonLog } = playerData;

  const ranking = Object.fromEntries(
    Object.entries(scoutRanking ?? {})
      .filter(([key]) => key !== 'playerId')
      .map(([key, value]) => [key.replace('Rank', ''), value])
  );

  const handleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(playerData.playerId);
    } else {
      addBookmark({
        playerId: playerData.playerId, // Include playerId
        playerBio: playerBio, // Include playerBio
        gameLogs: gameLogs, // Use gameLogs instead of currPlayerGames
        seasonLog: seasonLog, // Use original seasonLog
        scoutRanking: scoutRanking, // Use original scoutRanking
        playerMeasurements: measurements // Use measurements instead of playerMeasurements
      } as FullPlayerData);
    }

    setIsBookmarked(!isBookmarked);
  }

  const handlePrint = () => {
    window.print(); // Implementing print logic
  }

  return (
    <div className="player-container">
      <main className="main-content">
        <Card className="profile-card">
          <Card.Image src={playerBio.photoUrl ?? ''} alt={`${playerBio.name}'s profile`} />
          <Card.Header>
            <div className="player-name">
              <h1 className="name">{playerBio.name}</h1>
              <span className="position">SG</span>
              <span className="jersey">#13</span>
            </div>
          </Card.Header>
          <Card.Body>
            <div className="tags">
              <span>{playerBio.currentTeam}</span>
              <span>{playerBio.league}</span>
              <span>
                <FontAwesomeIcon icon={faFlag} /> {playerBio.homeCountry}
              </span>
            </div>
            <div className="profile-details">
              <div className="stats">
                {
                  Object.entries(ranking).map(([key, value]: [string, number]) => {
                    return ( 
                      <div key={key} className="stat">
                        <span>#{value == 0 ? 'N/A' : value}</span>
                        <span>{key}</span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <div className="player-actions">
              <button className={`button ${isBookmarked ? 'button-error' : 'button-success'}`} onClick={handleBookmark}>
                <FontAwesomeIcon icon={faUserPlus} />
                { isBookmarked ? ' Remove Bookmark' : ' Add Bookmark'}
              </button>
              <button className="button button-secondary" onClick={handlePrint}>
                <FontAwesomeIcon icon={faPrint} /> Print-friendly
              </button>
            </div>
          </Card.Footer>
        </Card>

        <Card className='bio-card'>
          <Card.Header>
            <h2>Player Bio</h2>
          </Card.Header>
          <Card.Body className='bio-info'>
            <div><span>Age</span><span>{new Date().getFullYear() - new Date(playerBio.birthDate).getFullYear()}</span></div>
            <div><span>Height</span><span>{`${Math.floor(playerBio.height / 12)}'${playerBio.height % 12}"`}</span></div>
            <div><span>Weight</span><span>{measurements?.weight}</span></div>
            <div><span>Birth Date</span><span>{new Date(playerBio.birthDate).toLocaleDateString()}</span></div>
            <div><span>Hometown</span><span>{playerBio.homeTown}, {playerBio.homeState}</span></div>
            <div><span>High School</span><span>{playerBio.highSchool}</span></div>
            <div><span>Nationality</span><span>{playerBio.nationality}</span></div>
          </Card.Body>
        </Card>
        <Card className='section-card gamelogs-card'>
          <Card.Header>
            <h2>Game-by-Game Scoring</h2>
          </Card.Header>
          <Card.Body>
            <div className="chart-placeholder">
            <BarChart
              xAxis={[{ data: gameLogs.map(log => new Date(log.date).toLocaleDateString()).reverse() }]}
              series={[
                { data: gameLogs.map(log => log.pts), label: 'Points' },
                { data: gameLogs.map(log => log.ast), label: 'Assists' },
                { data: gameLogs.map(log => log.reb), label: 'Rebounds' },
              ]}
              height={300}
            />
            </div>
          </Card.Body>
        </Card>
        <Card className="section-card strengths-weaknesses-card">
          <Card.Header>
            <h2>Strengths & Weaknesses</h2>
          </Card.Header>
          <Card.Body>
            <div className="strengths-weaknesses">
              <div className="strengths">
                <h4><FontAwesomeIcon icon={faArrowUp} /> Strengths</h4>
                <ul>
                  <li>Explosive first step and quick acceleration</li>
                  <li>Reliable mid-range shooter</li>
                  <li>Excellent court vision for position</li>
                  <li>High basketball IQ</li>
                </ul>
              </div>
              <div className="weaknesses">
                <h4><FontAwesomeIcon icon={faArrowDown} /> Weaknesses</h4>
                <ul>
                  <li>Needs to improve 3PT consistency</li>
                  <li>Occasional lapses on defense</li>
                  <li>Tends to over-dribble in traffic</li>
                </ul>
              </div>
            </div>
          </Card.Body>
        </Card>
      </main>
    </div>
  )
}

export default Player