import './upload.css'

import { useData } from '../../../hooks/DataContext'
import { useState } from 'react'

import type { FullPlayerData } from '../../../utils/types'

import { Card } from '../../../components'

import { TextField } from '@mui/material'

import { DateField } from '@mui/x-date-pickers/DateField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

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

  return (
    <div className="dashboard-subpage-container">
      <header className="dashboard-subpage-header">
        <h1>Upload Player Data</h1>
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