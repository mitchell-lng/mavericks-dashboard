import './compare.css'

import { useData } from '../../../hooks/DataContext'

import { PlayerSearch } from '../components';

import { useEffect, useState } from 'react';

import type { FullPlayerData } from '../../../utils/types'

import { Unstable_RadarChart as RadarChart } from '@mui/x-charts';
import { BarChart } from '@mui/x-charts/BarChart'

import { Card } from '../../../components';

const Compare = () => {
    const { data, addBookmark, removeBookmark } = useData();

    const [playerA, setPlayerA] = useState<number | null>(null);
    const [playerB, setPlayerB] = useState<number | null>(null);

    const [playerAData, setPlayerAData] = useState<FullPlayerData | null>(null);
    const [playerBData, setPlayerBData] = useState<FullPlayerData | null>(null);

    const [bookmarked, setBookmarked] = useState<{ playerA: boolean | null; playerB: boolean | null }>({ playerA: null, playerB: null });

    useEffect(() => {
        // Fetch player data for comparison
        const playerAData = data.players?.find((player) => player.playerId === playerA);

        setPlayerAData(playerAData || null);
        
        if (playerAData) {
            setBookmarked((prev) => ({ ...prev, playerA: data.bookmarks?.some((bookmark) => bookmark.playerId === playerAData.playerId) ?? false }));
        } else {
            setBookmarked((prev) => ({ ...prev, playerA: null }));
        }
    }, [playerA, data.players, data.bookmarks]);

    useEffect(() => {
        // Fetch player data for comparison
        const playerBData = data.players?.find((player) => player.playerId === playerB);

        setPlayerBData(playerBData || null);
        
        if (playerBData) {
            setBookmarked((prev) => ({ ...prev, playerB: data.bookmarks?.some((bookmark) => bookmark.playerId === playerBData.playerId) ?? false }));
        } else {
            setBookmarked((prev) => ({ ...prev, playerB: null }));
        }
    }, [playerB, data.players, data.bookmarks]);

    return (
        <div className="dashboard-subpage-container">
            <header className="dashboard-subpage-header">
                <h1>Compare Players</h1>
            </header>
            <main className="dashboard-subpage-content">
                <Card>
                    <Card.Body>
                        <div className="player-search-container">
                            <div>
                                <p>Player A</p>
                                <PlayerSearch
                                    function={(id: number) => {
                                        setPlayerA(id);
                                    }}
                                />
                            </div>
                            <div>
                                <p>Player B</p>
                                <PlayerSearch
                                    function={(id: number) => {
                                        setPlayerB(id);
                                    }}
                                />
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <div className="comparison-container">
                    <div className="comparison-data">
                        {playerAData ? (
                            <Card>
                                <Card.Header>
                                    <h2>{playerAData.playerBio.name}</h2>
                                    {
                                        bookmarked.playerA !== null && (
                                            <button
                                                className={`button button-secondary ${bookmarked.playerA ? 'button-error' : 'button-success'}`}
                                                onClick={() => {
                                                    if (bookmarked.playerA) {
                                                        removeBookmark(playerAData.playerId);
                                                    } else {
                                                        addBookmark(playerAData);
                                                    }
                                                    setBookmarked((prev) => ({ ...prev, playerA: !prev.playerA }));
                                                }}
                                            >
                                                {bookmarked.playerA ? 'Unbookmark' : 'Bookmark'}
                                            </button>
                                        )
                                    }
                                </Card.Header>
                                <Card.Body>
                                    {playerAData.seasonLog && (
                                        <div className='player-info-card'>
                                            <div><span>Height</span><span>{playerAData.playerBio?.height ? `${playerAData.playerBio.height} in` : 'N/A'}</span></div>
                                            <div><span>Weight</span><span>{playerAData.playerBio?.weight ? `${playerAData.playerBio.weight} lbs` : 'N/A'}</span></div>
                                            <div><span>Games Played</span><span>{playerAData.seasonLog?.GP ?? 'N/A'}</span></div>
                                            <div><span>Points</span><span>{playerAData.seasonLog?.PTS !== undefined ? `${playerAData.seasonLog.PTS} / game` : 'N/A'}</span></div>
                                            <div><span>Assists</span><span>{playerAData.seasonLog?.AST !== undefined ? `${playerAData.seasonLog.AST} / game` : 'N/A'}</span></div>
                                            <div><span>Rebounds</span><span>{playerAData.seasonLog?.TRB !== undefined ? `${playerAData.seasonLog.TRB} / game` : 'N/A'}</span></div>
                                            <div><span>Steals</span><span>{playerAData.seasonLog?.STL !== undefined ? `${playerAData.seasonLog.STL} / game` : 'N/A'}</span></div>
                                            <div><span>Blocks</span><span>{playerAData.seasonLog?.BLK !== undefined ? `${playerAData.seasonLog.BLK} / game` : 'N/A'}</span></div>
                                            <div><span>Turnovers</span><span>{playerAData.seasonLog?.TOV !== undefined ? `${playerAData.seasonLog.TOV} / game` : 'N/A'}</span></div>
                                            <div><span>Field Goal %</span><span>{playerAData.seasonLog?.['FG%'] !== undefined ? `${playerAData.seasonLog['FG%']}%` : 'N/A'}</span></div>
                                            <div><span>Three Point %</span><span>{playerAData.seasonLog?.['3P%'] !== undefined ? `${playerAData.seasonLog['3P%']}%` : 'N/A'}</span></div>
                                            <div><span>Free Throw %</span><span>{playerAData.seasonLog?.FTP !== undefined ? `${playerAData.seasonLog.FTP}%` : 'N/A'}</span></div>
                                            <div><span>Minutes</span><span>{playerAData.seasonLog?.MP !== undefined ? `${playerAData.seasonLog.MP} min` : 'N/A'}</span></div>
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
                                    {
                                        bookmarked.playerB !== null && (
                                            <button
                                                className={`button button-secondary ${bookmarked.playerB ? 'button-error' : 'button-success'}`}
                                                onClick={() => {
                                                    if (bookmarked.playerB) {
                                                        removeBookmark(playerBData.playerId);
                                                    } else {
                                                        addBookmark(playerBData);
                                                    }
                                                    setBookmarked((prev) => ({ ...prev, playerB: !prev.playerB }));
                                                }}
                                            >
                                                {bookmarked.playerB ? 'Unbookmark' : 'Bookmark'}
                                            </button>
                                        )
                                    }
                                </Card.Header>
                                <Card.Body>
                                    {playerBData.seasonLog && (
                                        <div className='player-info-card'>
                                        <div><span>Height</span><span>{playerBData.playerBio?.height ? `${playerBData.playerBio.height} in` : 'N/A'}</span></div>
                                        <div><span>Weight</span><span>{playerBData.playerBio?.weight ? `${playerBData.playerBio.weight} lbs` : 'N/A'}</span></div>
                                        <div><span>Games Played</span><span>{playerBData.seasonLog?.GP ?? 'N/A'}</span></div>
                                        <div><span>Points</span><span>{playerBData.seasonLog?.PTS !== undefined ? `${playerBData.seasonLog.PTS} / game` : 'N/A'}</span></div>
                                        <div><span>Assists</span><span>{playerBData.seasonLog?.AST !== undefined ? `${playerBData.seasonLog.AST} / game` : 'N/A'}</span></div>
                                        <div><span>Rebounds</span><span>{playerBData.seasonLog?.TRB !== undefined ? `${playerBData.seasonLog.TRB} / game` : 'N/A'}</span></div>
                                        <div><span>Steals</span><span>{playerBData.seasonLog?.STL !== undefined ? `${playerBData.seasonLog.STL} / game` : 'N/A'}</span></div>
                                        <div><span>Blocks</span><span>{playerBData.seasonLog?.BLK !== undefined ? `${playerBData.seasonLog.BLK} / game` : 'N/A'}</span></div>
                                        <div><span>Turnovers</span><span>{playerBData.seasonLog?.TOV !== undefined ? `${playerBData.seasonLog.TOV} / game` : 'N/A'}</span></div>
                                        <div><span>Field Goal %</span><span>{playerBData.seasonLog?.['FG%'] !== undefined ? `${playerBData.seasonLog['FG%']}%` : 'N/A'}</span></div>
                                        <div><span>Three Point %</span><span>{playerBData.seasonLog?.['3P%'] !== undefined ? `${playerBData.seasonLog['3P%']}%` : 'N/A'}</span></div>
                                        <div><span>Free Throw %</span><span>{playerBData.seasonLog?.FTP !== undefined ? `${playerBData.seasonLog.FTP}%` : 'N/A'}</span></div>
                                        <div><span>Minutes</span><span>{playerBData.seasonLog?.MP !== undefined ? `${playerBData.seasonLog.MP} min` : 'N/A'}</span></div>
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
                        <>
                            <div className="comparison-data">
                                <Card className="comparison-chart">
                                    <Card.Header>
                                        <h2>Statistical Comparison</h2>
                                    </Card.Header>
                                    <Card.Body>
                                        <RadarChart
                                            width={600}
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
                                    </Card.Body>
                                </Card>
                                <Card>
                                    <Card.Header>
                                        <h2>Physical Measurements</h2>
                                    </Card.Header>
                                    <Card.Body>
                                        <RadarChart
                                            width={600}
                                            height={500}
                                            series={[
                                                {
                                                    label: playerAData.playerBio.name,
                                                    data: [
                                                        playerAData.playerBio?.height ?? 0,
                                                        playerAData.measurements?.weight ?? 0,
                                                        playerAData.measurements?.wingspan ?? 0,
                                                        playerAData.measurements?.reach ?? 0,
                                                        playerAData.measurements?.handLength ?? 0,
                                                        playerAData.measurements?.handWidth ?? 0,
                                                    ]
                                                },
                                                {
                                                    label: playerBData.playerBio.name,
                                                    data: [
                                                        playerBData.playerBio?.height ?? 0,
                                                        playerBData.measurements?.weight ?? 0,
                                                        playerBData.measurements?.wingspan ?? 0,
                                                        playerBData.measurements?.reach ?? 0,
                                                        playerBData.measurements?.handLength ?? 0,
                                                        playerBData.measurements?.handWidth ?? 0,
                                                    ]
                                                },
                                            ]}
                                            radar={{
                                                metrics: [
                                                    { name: 'Height' },
                                                    { name: 'Weight' },
                                                    { name: 'Wingspan' },
                                                    { name: 'Standing Reach' },
                                                    { name: 'Hand Length' },
                                                    { name: 'Hand Width' },
                                                ],
                                            }}
                                        />
                                    </Card.Body>
                                </Card>
                            </div>
                            <div className='comparison-data'>
                                <Card>
                                    <Card.Header>
                                        <h2>Games Comparison</h2>
                                    </Card.Header>
                                    <Card.Body>
                                        <BarChart
                                            xAxis={[
                                                {
                                                    data: playerAData?.gameLogs?.map(log => new Date(log.date).toLocaleDateString()).reverse() ?? [],
                                                    label: 'Game Date',
                                                }
                                            ]}
                                            series={[
                                                {
                                                    data: playerAData?.gameLogs?.map(log => log.pts).reverse() ?? [],
                                                    label: `${playerAData?.playerBio.name} PTS`,
                                                },
                                                {
                                                    data: playerAData?.gameLogs?.map(log => log.ast).reverse() ?? [],
                                                    label: `${playerAData?.playerBio.name} AST`,
                                                },
                                                {
                                                    data: playerBData?.gameLogs?.map(log => log.pts).reverse() ?? [],
                                                    label: `${playerBData?.playerBio.name} PTS`,
                                                },
                                                {
                                                    data: playerBData?.gameLogs?.map(log => log.ast).reverse() ?? [],
                                                    label: `${playerBData?.playerBio.name} AST`,
                                                },
                                            ]}
                                            height={300}
                                        />
                                    </Card.Body>
                                </Card>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Compare