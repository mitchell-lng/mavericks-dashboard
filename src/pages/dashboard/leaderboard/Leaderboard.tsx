import './leaderboard.css'

import { Card } from '../../../components'

import { useEffect, useState } from 'react'

import { useData } from '../../../hooks/DataContext'

import { Switch, FormGroup, FormControlLabel, Tooltip, Accordion, AccordionSummary, AccordionDetails } from '@mui/material'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

import type { DataFieldMinimum } from '../../../utils/types'
import { NavLink } from 'react-router'

const Leaderboard = () => {
  const { data, toggleLeaderboardField } = useData();

  const [fullPlayerDataFields, setFullPlayerDataFields] = useState(data.leaderboardFields);

  useEffect(() => {
    setFullPlayerDataFields(data.leaderboardFields);

    console.log('Leaderboard fields updated:', data.leaderboardFields);
  }, [data.leaderboardFields]);

  const calculateLeaderboard = (field: string, subfield: string, reverse: boolean) => {
    // Placeholder function to calculate leaderboard data
    if (!data || !Array.isArray(data.players)) return [];

    const players = data.players
      .map((player: any) => {
        const value = player[field]?.[subfield];
        return {
          playerId: player.playerBio.playerId,
          name: player.playerBio.name,
          value: typeof value === 'number' ? value : null,
          unit: (data.leaderboardFields?.[field]?.fields?.[subfield] as { unit?: string })?.unit,
        };
      })
      .filter((p: any) => typeof p.value === 'number');

    if (reverse) {
      players.sort((a: any, b: any) => {
        if (a.value == null && b.value == null) return 0;
        if (a.value == null) return 1;
        if (b.value == null) return -1;
        return a.value - b.value;
      });
    }
    else {
      players.sort((a: any, b: any) => {
        if (a.value == null && b.value == null) return 0;
        if (a.value == null) return 1;
        if (b.value == null) return -1;
        return b.value - a.value;
      });
    }

    return players.slice(0, 10); // Top 10 players
  
  }

  

  return (
    <div className="dashboard-subpage-container">
      <header className="dashboard-subpage-header">
        <h1>Leaderboard</h1>
      </header>
      <main className="dashboard-subpage-content leaderboard-main">
        <div className='leaderboard-switches'>
        {fullPlayerDataFields &&
          Object.entries(fullPlayerDataFields).map(([key, field], index) => (
            <Accordion key={index} defaultExpanded={false}>
              <AccordionSummary expandIcon={<FontAwesomeIcon icon={faPlus} />}>
                <p style={{ margin: 0 }}>{field.label}</p>
              </AccordionSummary>
              <AccordionDetails>
                <FormGroup>
                  {field.fields &&
                    Object.entries(field.fields).map(([subKey, subfield], subindex) => (
                      <Tooltip title={(subfield as { description?: string }).description || ''} arrow key={subindex}>
                        <FormControlLabel
                          label={(subfield as { label: string }).label}
                          control={
                            <Switch
                              checked={(subfield as { checked: boolean }).checked}
                              onChange={(_: any) => {
                                // Handle the switch change
                                toggleLeaderboardField({ parent: key, field: subKey } as DataFieldMinimum);
                              }}
                            />
                          }
                        />
                      </Tooltip>
                    ))}
                </FormGroup>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
        <div className='leaderboard-cards'>
          {fullPlayerDataFields &&
            Object.entries(fullPlayerDataFields).flatMap(([key, field]) =>
              Object.entries(field.fields ?? {})
                .filter(([, subfield]) => (subfield as { checked?: boolean }).checked)
                .map(([subKey, subfield], _) => {
                  // Example: You may want to compute leaderboard data here based on subKey
                  // For demonstration, we'll use a placeholder array
                  const players = calculateLeaderboard(key, subKey, (subfield as { reverse?: boolean }).reverse ?? false);

                  return (
                    <Card key={`${key}-${subKey}`}>
                      <Card.Header>
                        <h2>{(subfield as { label: string }).label}</h2>
                      </Card.Header>
                      <Card.Body>
                        <table>
                          <thead>
                            <tr>
                              <th>Rank</th>
                              <th>Player</th>
                              <th>{(subfield as { unit?: string }).unit}</th>
                            </tr>
                          </thead>
                          <tbody>
                            {players.map((player: any, index: number) => (
                              <tr key={player.playerId}>
                                <td>#{index + 1}</td>
                                <td><NavLink to={`/dashboard/player/${player.playerId}`}>{player.name}</NavLink></td>
                                <td>{player.value ?? 0}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </Card.Body>
                    </Card>
                  );
                })
            )
          }
        </div>
      </main>
    </div>
  )
}

export default Leaderboard