import './compare.css'

import { useData } from '../../../hooks/DataContext'

import { PlayerSearch } from '../components';

import { useState } from 'react';

import type { FullPlayerData } from '../../../utils/types'

import { Unstable_RadarChart as RadarChart } from '@mui/x-charts';

import { Card } from '../../../components';

const Compare = () => {
    const { data } = useData();

    const [playerA, setPlayerA] = useState<number | null>(null);
    const [playerB, setPlayerB] = useState<number | null>(null);

    const [playerAData, setPlayerAData] = useState<FullPlayerData | null>(null);
    const [playerBData, setPlayerBData] = useState<FullPlayerData | null>(null);

    const handlePlayerASelect = (id: number) => {
        setPlayerA(id);

        // Fetch player data for comparison
        const playerAData = data.players?.find((player) => player.playerId === playerA);
        setPlayerAData(playerAData || null);
    };

    const handlePlayerBSelect = (id: number) => {
        setPlayerB(id);

        // Fetch player data for comparison
        const playerBData = data.players?.find((player) => player.playerId === playerB);
        setPlayerBData(playerBData || null);
    };

    return (
        <div className="dashboard-subpage-container">
            <header className="dashboard-subpage-header">
                <h1>Compare Players</h1>
            </header>
            <main className="dashboard-subpage-content">
                <Card>
                    <Card.Header>
                        <h2>Select Players to Compare</h2>
                    </Card.Header>
                    <Card.Body>
                        <div className="player-search-container">
                            <PlayerSearch
                                function={handlePlayerASelect}
                            />
                            <PlayerSearch
                                function={handlePlayerBSelect}
                            />
                        </div>
                    </Card.Body>
                </Card>
                <div className="comparison-container">
                    <div className="comparison-data">
                        {playerAData ? (
                            <Card>
                                <Card.Header>
                                    <h2>{playerAData.playerBio.name}</h2>
                                </Card.Header>
                                <Card.Body>
                                    <p>Height: {playerAData.playerBio?.height}</p>
                                    <p>Weight: {playerAData.playerBio?.weight}</p>
                                    {playerAData.seasonLog && (
                                        <div>
                                            <p>Games Played: {playerAData.seasonLog.GP}</p>
                                            <p>Points: {playerAData.seasonLog.PTS}</p>
                                            <p>Assists: {playerAData.seasonLog.AST}</p>
                                            <p>Rebounds: {playerAData.seasonLog.TRB}</p>
                                            <p>Steals: {playerAData.seasonLog.STL}</p>
                                            <p>Blocks: {playerAData.seasonLog.BLK}</p>
                                            <p>Turnovers: {playerAData.seasonLog.TOV}</p>
                                            <p>Field Goal %: {playerAData.seasonLog['FG%']}</p>
                                            <p>Three Point %: {playerAData.seasonLog['3P%']}</p>
                                            <p>Free Throw %: {playerAData.seasonLog.FTP}</p>
                                            <p>Minutes: {playerAData.seasonLog.MP}</p>
                                            {/* Add any other fields from seasonLog as needed */}
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        ) : (
                            <Card>
                                <Card.Body>
                                    <p>Select player A</p>
                                </Card.Body>
                            </Card>
                        )}
                        { playerBData ? (
                            <Card>
                                <Card.Header>
                                    <h2>{ playerBData.playerBio.name }</h2>
                                </Card.Header>
                                <Card.Body>
                                <p>Height: {playerBData.playerBio?.height}</p>
                                    <p>Weight: {playerBData.playerBio?.weight}</p>
                                        {playerBData.seasonLog && (
                                        <div>
                                            <p>Games Played: {playerBData.seasonLog.GP}</p>
                                            <p>Points: {playerBData.seasonLog.PTS}</p>
                                            <p>Assists: {playerBData.seasonLog.AST}</p>
                                            <p>Rebounds: {playerBData.seasonLog.TRB}</p>
                                            <p>Steals: {playerBData.seasonLog.STL}</p>
                                            <p>Blocks: {playerBData.seasonLog.BLK}</p>
                                            <p>Turnovers: {playerBData.seasonLog.TOV}</p>
                                            <p>Field Goal %: {playerBData.seasonLog['FG%']}</p>
                                            <p>Three Point %: {playerBData.seasonLog['3P%']}</p>
                                            <p>Free Throw %: {playerBData.seasonLog.FTP}</p>
                                            <p>Minutes: {playerBData.seasonLog.MP}</p>
                                            {/* Add any other fields from seasonLog as needed */}
                                        </div>
                                    )}
                                </Card.Body>
                            </Card>
                        ) : (
                            <Card>
                                <Card.Body>
                                    <p>Select player B</p>
                                </Card.Body>
                            </Card>
                        )}
                    </div>
                    {playerAData && playerBData && (
                        <Card className="comparison-chart">
                            <RadarChart
                                width={800}
                                height={500}
                                series={[
                                    {
                                        label: playerAData.playerBio.name,
                                        data: [
                                            playerAData.seasonLog?.PTS ?? 0,
                                            playerAData.seasonLog?.AST ?? 0,
                                            playerAData.seasonLog?.TRB ?? 0,
                                            playerAData.seasonLog?.STL ?? 0,
                                            playerAData.seasonLog?.BLK ?? 0,
                                            playerAData.seasonLog?.TOV ?? 0,
                                            playerAData.seasonLog?.['FG%'] ?? 0,
                                            playerAData.seasonLog?.['3P%'] ?? 0,
                                            playerAData.seasonLog?.FTP ?? 0,
                                        ]
                                    },
                                    {
                                        label: playerBData.playerBio.name,
                                        data: [
                                            playerBData.seasonLog?.PTS ?? 0,
                                            playerBData.seasonLog?.AST ?? 0,
                                            playerBData.seasonLog?.TRB ?? 0,
                                            playerBData.seasonLog?.STL ?? 0,
                                            playerBData.seasonLog?.BLK ?? 0,
                                            playerBData.seasonLog?.TOV ?? 0,
                                            playerBData.seasonLog?.['FG%'] ?? 0,
                                            playerBData.seasonLog?.['3P%'] ?? 0,
                                            playerBData.seasonLog?.FTP ?? 0,
                                        ]
                                    },
                                ]}
                                radar={{
                                    metrics: [
                                        { name: 'Points' },
                                        { name: 'Assists' },
                                        { name: 'Rebounds' },
                                        { name: 'Steals' },
                                        { name: 'Blocks' },
                                        { name: 'Turnovers' },
                                        { name: 'Field Goal %' },
                                        { name: 'Three Point %' },
                                        { name: 'Free Throw %' },
                                    ],
                                }}
                            />
                        </Card>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Compare