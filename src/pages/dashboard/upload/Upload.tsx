import './upload.css'

import { useData } from '../../../hooks/DataContext'
import { useState } from 'react'

import type { FullPlayerData, PlayerBio, ScoutRanking, PlayerMeasurements, GameLog, SeasonLog } from '../../../utils/types'

import { Card } from '../../../components'

import { TextField } from '@mui/material'

import { DateField } from '@mui/x-date-pickers/DateField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUpload } from '@fortawesome/free-solid-svg-icons'

const defaultData = {
  playerBio: {
    firstName: "",
    lastName: "",
    birthDate: "",
    height: "",
    weight: "",
    highSchool: "",
    highSchoolState: "",
    homeTown: "",
    homeState: "",
    homeCountry: "",
    nationality: "",
    photoUrl: "",
    currentTeam: "",
    league: "",
    leagueType: "",
  },
  scoutRanking: {
    espnRank: "",
    samVecenieRank: "",
    kevinOConnorRank: "",
    kyleBooneRank: "",
    garyParrishRank: "",
  },
  measurements: {
    heightNoShoes: "",
    heightShoes: "",
    wingspan: "",
    reach: "",
    maxVertical: "",
    noStepVertical: "",
    measurementWeight: "",
    bodyFat: "",
    handLength: "",
    handWidth: "",
    agility: "",
    sprint: "",
    shuttleLeft: "",
    shuttleRight: "",
    shuttleBest: "",
  },
  gameLogs: [],
  playerId: 0,
  newScoutReport: {
    report: "",
    date: new Date().toISOString().split('T')[0], // Default to today's date
    scoutName: "",
  },
}

function getMappedData(Data: any) {
    return new Promise<FullPlayerData[]>((resolve) => {
        setTimeout(() => {
            let mappedData : FullPlayerData[] = [];

            const bio = Data.bio;
            const scoutRankings = Data.scoutRankings;
            const measurements = Data.measurements;
            const gameLogs = Data.game_logs;
            const seasonLogs = Data.seasonLogs;
            const scoutReports = Data.scoutingReports;

            bio.forEach((player: PlayerBio) => {
                const playerId = player.playerId;
                const playerScoutRanking = scoutRankings.find((ranking: ScoutRanking) => ranking.playerId === playerId);
                const playerMeasurements = measurements.find((measurement: PlayerMeasurements) => measurement.playerId === playerId);
                const playerGameLogs = gameLogs.filter((log: GameLog) => log.playerId === playerId);
                const playerSeasonLog = seasonLogs.find((log: SeasonLog) => log.playerId === playerId);
                const playerScoutReport = scoutReports
                    .filter((report: any) => report.playerId === playerId)
                    .map((report: any) => ({
                        playerId: report.playerId,
                        report: report.report,
                        date: report.date,
                        scoutName: report.scout,
                    }));

                mappedData.push({
                    playerId: playerId,
                    playerBio: player,
                    scoutRanking: playerScoutRanking,
                    measurements: playerMeasurements,
                    gameLogs: playerGameLogs,
                    seasonLog: playerSeasonLog,
                    scoutingReports: playerScoutReport,
                });
            });
            resolve(mappedData);
        }, 1000);
    });
}

const Upload = () => {
  const { data, addPlayer } = useData();
  
  const [playerBio, setPlayerBio] = useState(defaultData.playerBio);

  const [scoutRanking, setScoutRanking] = useState(defaultData.scoutRanking);

  const [measurements, setMeasurements] = useState(defaultData.measurements);

  const [newScoutReport, setNewScoutReport] = useState(defaultData.newScoutReport);

  const handleSubmit = () => {
    const playerId = (data.players ?? []).length + 1; // Assuming playerId is just the length of the players array + 1

    const newPlayerBio = { 
      ...playerBio, 
      playerId, 
      name: `${playerBio.firstName} ${playerBio.lastName}`, 
      height: Number(playerBio.height), 
      weight: Number(playerBio.weight) 
    };

    const newScoutRanking = {
      playerId,
      "ESPN Rank": Number(scoutRanking.espnRank) || null,
      "Sam Vecenie Rank": Number(scoutRanking.samVecenieRank) || null,
      "Kevin O'Connor Rank": Number(scoutRanking.kevinOConnorRank) || null,
      "Kyle Boone Rank": Number(scoutRanking.kyleBooneRank) || null,
      "Gary Parrish Rank": Number(scoutRanking.garyParrishRank) || null,
    };

    const newMeasurements = {
      ...Object.fromEntries(
        Object.entries(measurements).map(([key, val]) => [key, Number(val)])
      ),
      playerId,
    };

    const newScoutReportData = {
      playerId,
      report: newScoutReport.report,
      date: newScoutReport.date,
      scoutName: newScoutReport.scoutName,
    };

    const newPlayerData: FullPlayerData = {
      playerBio: newPlayerBio,
      scoutRanking: newScoutRanking,
      measurements: newMeasurements,
      gameLogs: [],
      playerId,
      scoutingReports: [newScoutReportData],
    };

    // Assuming you have a function to add the new player data to your context or state
    addPlayer(newPlayerData); // Call the function to add player data

    // Reset the form
    setPlayerBio(defaultData.playerBio);
    setScoutRanking(defaultData.scoutRanking);
    setMeasurements(defaultData.measurements);
    setNewScoutReport(defaultData.newScoutReport);
  };

  const handleChange = (e: any, sectionSetter: any) => {
    const { name, value } = e.target;
    sectionSetter((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonData = JSON.parse(event.target?.result as string);
      
      getMappedData(jsonData).then((mappedData) => {
        mappedData.forEach((playerData) => {
          addPlayer(playerData); // Add each player data to the context or state
        });
      });
    };
    reader.readAsText(file);
  };

  const handleFileInput = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.onchange = handleUpload;
    fileInput.click();
  };

  return (
    <div className="dashboard-subpage-container">
      <header className="dashboard-subpage-header">
        <h1>Upload Player Data</h1>
        <div className='dashboard-subpage-header-actions'>
          <button onClick={handleFileInput} className="button button-secondary"><FontAwesomeIcon icon={faUpload} /> Upload JSON</button>
      </div>
      </header>
      <main className="dashboard-subpage-content">
        <Card className="form-section">
          <Card.Image src={playerBio.photoUrl} alt={`Photo of ${playerBio.firstName} ${playerBio.lastName}`} />
          <Card.Header>
            <h2>Player Bio</h2>
          </Card.Header>
          <Card.Body className="form-grid">
            <TextField required label="First Name" name="firstName" value={playerBio.firstName} onChange={(e) => handleChange(e, setPlayerBio)}  />
            <TextField required label="Last Name" name="lastName" value={playerBio.lastName} onChange={(e) => handleChange(e, setPlayerBio)}  />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                  label="Birth Date"
                  name="birthDate"
                  onChange={(e) => handleChange(e, setPlayerBio)}
                />
            </LocalizationProvider>
            <TextField required label="Height (in)" name="height" type="number" value={playerBio.height} onChange={(e) => handleChange(e, setPlayerBio)}  />
            <TextField required label="Weight (lbs)" name="weight" type="number" value={playerBio.weight} onChange={(e) => handleChange(e, setPlayerBio)}  />
            <TextField label="High School" name="highSchool" value={playerBio.highSchool} onChange={(e) => handleChange(e, setPlayerBio)}  />
            <TextField label="High School State" name="highSchoolState" value={playerBio.highSchoolState} onChange={(e) => handleChange(e, setPlayerBio)}  />
            <TextField required label="Hometown" name="homeTown" value={playerBio.homeTown} onChange={(e) => handleChange(e, setPlayerBio)}  />
            <TextField label="Home State" name="homeState" value={playerBio.homeState} onChange={(e) => handleChange(e, setPlayerBio)}  />
            <TextField required label="Home Country" name="homeCountry" value={playerBio.homeCountry} onChange={(e) => handleChange(e, setPlayerBio)}  />
            <TextField required label="Nationality" name="nationality" value={playerBio.nationality} onChange={(e) => handleChange(e, setPlayerBio)}  />
            <TextField label="Photo URL" name="photoUrl" value={playerBio.photoUrl} onChange={(e) => handleChange(e, setPlayerBio)}  />
            <TextField required label="Current Team" name="currentTeam" value={playerBio.currentTeam} onChange={(e) => handleChange(e, setPlayerBio)}  />
            <TextField required label="League" name="league" value={playerBio.league} onChange={(e) => handleChange(e, setPlayerBio)}  />
            <TextField required label="League Type" name="leagueType" value={playerBio.leagueType} onChange={(e) => handleChange(e, setPlayerBio)}  />
          </Card.Body>
        </Card>

        <Card className="form-section">
          <Card.Header>
            <h2>Scout Rankings</h2>
          </Card.Header>
          <Card.Body className="form-grid">
            {Object.entries(scoutRanking).map(([key, value]) => (
              <TextField
                key={key}
                label={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase()).replace(/ Rank$/, " Rank")}
                name={key}
                type="number"
                value={value}
                onChange={(e) => handleChange(e, setScoutRanking)}
              />
            ))}
          </Card.Body>
        </Card>

        <Card className="form-section">
          <Card.Header>
            <h2>Add Scouting Report</h2>
          </Card.Header>
          <Card.Body>
            <TextField
              label="Scout Name"
              name="scoutName"
              type="text"
              onChange={(e) => handleChange(e, setNewScoutReport)}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateField
                value={dayjs()}
                name="date"
                onChange={(e) => handleChange(e, setNewScoutReport)}
              />
            </LocalizationProvider>
            <TextField
              label="Report"
              name="report"
              type="text"
              onChange={(e) => handleChange(e, setNewScoutReport)}
              multiline
              rows={4}
            />
          </Card.Body>
        </Card>

        <Card className="form-section">
          <Card.Header>
            <h2>Measurements</h2>
          </Card.Header>
          <Card.Body className="form-grid">
            <div className="form-grid">
              {Object.entries(measurements).map(([key, value]) => (
                <TextField
                  key={key}
                  label={key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  name={key}
                  type="number"
                  value={value}
                  onChange={(e) => handleChange(e, setMeasurements)}
                />
              ))}
            </div>
          </Card.Body>
        </Card>
        <button className="button upload-button" onClick={handleSubmit}>Submit</button>
      </main>
    </div>
  );
}

export default Upload