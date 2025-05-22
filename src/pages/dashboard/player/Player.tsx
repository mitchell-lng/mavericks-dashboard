import './player.css'

import { Card } from '../../../components'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faUserPlus, faPrint, faArrowLeft, faEdit } from '@fortawesome/free-solid-svg-icons'
import { faFlag } from '@fortawesome/free-solid-svg-icons'

import { BarChart } from '@mui/x-charts/BarChart';

import type { FullPlayerData, ScoutingReport } from '../../../utils/types'

import { useData } from '../../../hooks/DataContext'

import { useLocation, useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'
import { TextField } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const Player = () => {
  const location = useLocation();

  const navigate = useNavigate();

  const {data, addBookmark, removeBookmark, updatePlayerData} = useData();

  const playerId = location.pathname.split('/').pop();
  const playerData = data.players?.find((player) => player.playerId === Number(playerId));

  const [isBookmarked, setIsBookmarked] = useState(false);

  const [playerScoutingReports, setPlayerScoutingReports] = useState<ScoutingReport[]>([]);
  const [newScoutReport, setNewScoutReport] = useState<ScoutingReport>({
    playerId: Number(playerId),
    scoutName: '',
    date: new Date().toISOString().split('T')[0],
    report: ''
  });

  useEffect(() => {
    setPlayerScoutingReports(playerData?.scoutingReports ?? []);
  }, [playerData, data.players?.some((player) => player.playerId === Number(playerId))]);

  useEffect(() => {
    setIsBookmarked(data.bookmarks?.some((bookmark) => bookmark.playerId === Number(playerId)) || false);
  }, [data.bookmarks, playerId]);

  if (!playerData) {
    return (
      <div>
        <p>Player not found</p>
        <button className='button' onClick={() => navigate(-1)}>
          <FontAwesomeIcon icon={faArrowLeft} /> Go Back
        </button>
      </div>
    );
  }

  const { playerBio, measurements, scoutRanking, gameLogs, seasonLog, scoutingReports } = playerData;

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

  const handleAddReport = () => {
    if (newScoutReport.scoutName && newScoutReport.report) {
      const newReport: ScoutingReport = {
        ...newScoutReport
      };

      // Assuming you have a function to add the report to the player's data
      const updatedPlayerData = {
        ...playerData,
        scoutingReports: [...(scoutingReports ?? []), newReport]
      };

      // Update the player data in the context
      updatePlayerData(updatedPlayerData);

      // Reset the new scout report state
      setNewScoutReport({
        playerId: Number(playerId),
        scoutName: '',
        date: new Date().toISOString().split('T')[0],
        report: ''
      });
    } else {
      alert('Please fill in all fields');
    }
  }

  const handleFieldChange = (field: string, value: string) => {
    setNewScoutReport((prev) => ({
      ...prev,
      [field]: value
    }));
  }

  return (
    <div className="dashboard-subpage-container">
      <header className="dashboard-subpage-header">
        <h1>Player Data</h1>
        <div className='dashboard-subpage-header-actions'>
          <button onClick={() => navigate(-1)} className="button"><FontAwesomeIcon icon={faArrowLeft} /> Back</button>
        </div>
      </header>
      <main className="dashboard-subpage-content player-profile no-print">
        <Card className="profile-card">
          <Card.Image src={playerBio.photoUrl ?? ''} alt={`${playerBio.name}'s profile`} />
          <Card.Header>
            <div className="player-name">
              <h1 className="name">{playerBio.name}</h1>
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
                        <span>{(value == 0) || (value == undefined) ? 'N/A' : `#${value}`}</span>
                        <span>{key}</span>
                      </div>
                    )
                  })
                }
              </div>
            </div>
          </Card.Body>
          <Card.Footer>
            <div className="player-actions no-print">
              <button className={`button ${isBookmarked ? 'button-error' : 'button-success'}`} onClick={handleBookmark}>
                <FontAwesomeIcon icon={faUserPlus} />
                { isBookmarked ? ' Remove Bookmark' : ' Add Bookmark'}
              </button>
              <button className="button button-secondary" onClick={handlePrint}>
                <FontAwesomeIcon icon={faPrint} /> Print-friendly
              </button>
              <button className='button button-secondary' onClick={() => navigate(`edit`)}>
                <FontAwesomeIcon icon={faEdit} /> Edit Player
              </button>
            </div>
          </Card.Footer>
        </Card>

        <Card className='bio-card'>
          <Card.Header>
            <h2>Player Bio</h2>
          </Card.Header>
          <Card.Body className='player-info-card bio-card'>
            <div><span>Age</span><span>{new Date().getFullYear() - new Date(playerBio.birthDate).getFullYear()}</span></div>
            <div><span>Height</span><span>{`${Math.floor(playerBio.height / 12)}'${playerBio.height % 12}"`}</span></div>
            <div><span>Weight</span><span>{measurements?.weight}</span></div>
            <div><span>Wingspan</span><span>{measurements?.wingspan}</span></div>
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
            <BarChart
              xAxis={[{ data: gameLogs.map(log => new Date(log.date).toLocaleDateString()).reverse() }]}
              series={[
                { data: gameLogs.map(log => log.pts), label: 'Points' },
                { data: gameLogs.map(log => log.ast), label: 'Assists' },
                { data: gameLogs.map(log => log.reb), label: 'Rebounds' },
              ]}
              height={300}
            />
          </Card.Body>
        </Card>
        <Card className="section-card season-stats-card">
          <Card.Header>
            <h2>Season Stats</h2>
          </Card.Header>
          <Card.Body className='player-info-card'>
            <div><span>Games Played</span><span>{seasonLog?.GP ?? 'N/A'}</span></div>
            <div><span>Points Per Game</span><span>{seasonLog?.PTS?.toFixed(1) ?? 'N/A'}</span></div>
            <div><span>Rebounds Per Game</span><span>{seasonLog?.TRB?.toFixed(1) ?? 'N/A'}</span></div>
            <div><span>Assists Per Game</span><span>{seasonLog?.AST?.toFixed(1) ?? 'N/A'}</span></div>
            <div><span>Field Goal %</span><span>{seasonLog?.["FG%"] !== undefined ? `${(seasonLog["FG%"]).toFixed(1)}%` : 'N/A'}</span></div>
            <div><span>3PT %</span><span>{seasonLog?.["3P%"] !== undefined ? `${(seasonLog["3P%"]).toFixed(1)}%` : 'N/A'}</span></div>
            <div><span>Free Throw %</span><span>{seasonLog?.FTP !== undefined ? `${(seasonLog?.FTP).toFixed(1)}%` : 'N/A'}</span></div>
          </Card.Body>
        </Card>
        <Card className="section-card scouting-reports-card">
          <Card.Header>
            <h2>Scouting Reports</h2>
          </Card.Header>
          <Card.Body className='player-info-card'>
            <table className="scouting-reports-table">
              <thead>
              <tr>
                <th>Date</th>
                <th>Scout Name</th>
                <th>Report</th>
              </tr>
              </thead>
              <tbody>
                {(playerScoutingReports ?? [])
                .slice()
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((report, idx) => (
                  <tr key={report.date + report.scoutName + idx}>
                  <td>{report.date ?? 'N/A'}</td>
                  <td>{report.scoutName}</td>
                  <td>{report.report}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card.Body>
        </Card>
        <Card className='add-scouting-report-card'>
          <Card.Header>
            <h2>Add Scouting Report</h2>
          </Card.Header>
          <Card.Body>
            <TextField 
              label="Scout Name" 
              variant="outlined" 
              fullWidth 
              margin="normal" 
              value={newScoutReport.scoutName} 
              onChange={(e) => handleFieldChange('scoutName', e.target.value)} />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <TextField
                label="Date"
                variant="outlined"
                fullWidth
                margin="normal"
                type="date"
                value={newScoutReport.date}
                onChange={(e) => handleFieldChange('date', e.target.value)}
              />
            </LocalizationProvider>
            <TextField 
              label="Report" 
              variant="outlined" 
              fullWidth 
              margin="normal" 
              multiline
              rows={4}
              value={newScoutReport.report} 
              onChange={(e) => handleFieldChange('report', e.target.value)} />
            <button onClick={handleAddReport} className="button button-success">Add Report</button>
          </Card.Body>
        </Card>
      </main>
      <article className="player-print-article only-print">
        <section className="player-print-section only-print">
          <table className="player-print-table" style={{ width: '100%', borderCollapse: 'collapse', margin: '2rem 0' }}>
            <tbody>
              <tr>
                <td rowSpan={8} style={{ verticalAlign: 'top', padding: '1rem', border: '1px solid #ccc', width: 220 }}>
                  <img
                    src={playerBio.photoUrl ?? ''}
                    alt={`${playerBio.name}'s profile`}
                    style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: 8, border: '1px solid #ccc' }}
                  />
                </td>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Name</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{playerBio.name}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Current Team</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{playerBio.currentTeam}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>League</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{playerBio.league}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Home Country</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{playerBio.homeCountry}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Age</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{new Date().getFullYear() - new Date(playerBio.birthDate).getFullYear()}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Height</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{`${Math.floor(playerBio.height / 12)}'${playerBio.height % 12}"`}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Weight</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{measurements?.weight}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Birth Date</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{new Date(playerBio.birthDate).toLocaleDateString()}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Hometown</th>
                <td colSpan={2} style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{playerBio.homeTown}, {playerBio.homeState}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>High School</th>
                <td colSpan={2} style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{playerBio.highSchool}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Nationality</th>
                <td colSpan={2} style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{playerBio.nationality}</td>
              </tr>
            </tbody>
          </table>

          <h3 style={{ marginTop: '2rem' }}>Scout Rankings</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
            <thead>
              <tr>
                {Object.keys(ranking).map((key) => (
                  <th key={key} style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(ranking).map((value, idx) => (
                  <td key={idx} style={{ padding: '0.5rem', border: '1px solid #ccc' }}>
                    {(value == 0) || (value == undefined) ? 'N/A' : `#${value}`}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>

          <h3>Season Stats</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
            <tbody>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Games Played</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{seasonLog?.GP ?? 'N/A'}</td>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Points Per Game</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{seasonLog?.PTS?.toFixed(1) ?? 'N/A'}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Rebounds Per Game</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{seasonLog?.TRB?.toFixed(1) ?? 'N/A'}</td>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Assists Per Game</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{seasonLog?.AST?.toFixed(1) ?? 'N/A'}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Field Goal %</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{seasonLog?.["FG%"] !== undefined ? `${(seasonLog["FG%"]).toFixed(1)}%` : 'N/A'}</td>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>3PT %</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{seasonLog?.["3P%"] !== undefined ? `${(seasonLog["3P%"]).toFixed(1)}%` : 'N/A'}</td>
              </tr>
              <tr>
                <th style={{ textAlign: 'left', padding: '0.5rem', border: '1px solid #ccc' }}>Free Throw %</th>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{seasonLog?.FTP !== undefined ? `${(seasonLog?.FTP).toFixed(1)}%` : 'N/A'}</td>
                <td colSpan={2}></td>
              </tr>
            </tbody>
          </table>

          <h3>Scouting Reports</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '2rem' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Date</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Scout Name</th>
                <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Report</th>
              </tr>
            </thead>
            <tbody>
              {(playerScoutingReports ?? [])
                .slice()
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map((report, idx) => (
                  <tr key={report.date + report.scoutName + idx}>
                    <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{report.date ?? 'N/A'}</td>
                    <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{report.scoutName}</td>
                    <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{report.report}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </section>
      </article>
    </div>
  )
}

export default Player