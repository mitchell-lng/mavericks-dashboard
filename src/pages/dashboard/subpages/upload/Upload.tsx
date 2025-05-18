import './upload.css'

import { useData } from '../../../../hooks/DataContext'
import { useState } from 'react'

import type { FullPlayerData } from '../../../../utils/types'

import { Card } from '../../components'
import { TextField } from '@mui/material'

import { DateField } from '@mui/x-date-pickers/DateField'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const Upload = () => {
  const { data, addPlayer } = useData();
  
  const [playerBio, setPlayerBio] = useState({
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
  });

  const [scoutRanking, setScoutRanking] = useState({
    espnRank: "",
    samVecenieRank: "",
    kevinOConnorRank: "",
    kyleBooneRank: "",
    garyParrishRank: "",
  });

  const [measurements, setMeasurements] = useState({
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
  });

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
      "ESPN Rank": Number(scoutRanking.espnRank),
      "Sam Vecenie Rank": Number(scoutRanking.samVecenieRank),
      "Kevin O'Connor Rank": Number(scoutRanking.kevinOConnorRank),
      "Kyle Boone Rank": Number(scoutRanking.kyleBooneRank),
      "Gary Parrish Rank": Number(scoutRanking.garyParrishRank),
    };

    const newMeasurements = {
      ...measurements,
      playerId,
      heightNoShoes: Number(measurements.heightNoShoes),
      heightShoes: Number(measurements.heightShoes),
      wingspan: Number(measurements.wingspan),
      reach: Number(measurements.reach),
      maxVertical: Number(measurements.maxVertical),
      noStepVertical: Number(measurements.noStepVertical),
      measurementWeight: Number(measurements.measurementWeight),
      bodyFat: Number(measurements.bodyFat),
      handLength: Number(measurements.handLength),
      handWidth: Number(measurements.handWidth),
      agility: Number(measurements.agility),
      sprint: Number(measurements.sprint),
      shuttleLeft: Number(measurements.shuttleLeft),
      shuttleRight: Number(measurements.shuttleRight),
      shuttleBest: Number(measurements.shuttleBest),
    };

    const newPlayerData: FullPlayerData = {
      playerBio: newPlayerBio,
      scoutRanking: newScoutRanking,
      measurements: newMeasurements,
      gameLogs: [],
      playerId,
    };

    // Assuming you have a function to add the new player data to your context or state
    addPlayer(newPlayerData); // Call the function to add player data
  };

  const handleChange = (e: any, sectionSetter: any) => {
    const { name, value } = e.target;
    sectionSetter((prev: any) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="add-player-form">
      <Card className="form-section">
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
          <div className="form-grid">
            <TextField label="ESPN Rank" name="espnRank" type="number" value={scoutRanking.espnRank} onChange={(e) => handleChange(e, setScoutRanking)}  />
            <TextField label="Sam Vecenie Rank" name="samVecenieRank" type="number" value={scoutRanking.samVecenieRank} onChange={(e) => handleChange(e, setScoutRanking)}  />
            <TextField label="Kevin O'Connor Rank" name="kevinOConnorRank" type="number" value={scoutRanking.kevinOConnorRank} onChange={(e) => handleChange(e, setScoutRanking)}  />
            <TextField label="Kyle Boone Rank" name="kyleBooneRank" type="number" value={scoutRanking.kyleBooneRank} onChange={(e) => handleChange(e, setScoutRanking)}  />
            <TextField label="Gary Parrish Rank" name="garyParrishRank" type="number" value={scoutRanking.garyParrishRank} onChange={(e) => handleChange(e, setScoutRanking)}  />
          </div>
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
      <button className="button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Upload