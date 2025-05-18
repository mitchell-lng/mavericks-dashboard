import './dashboardHome.css'

import { ScatterChart } from '@mui/x-charts'
import type { ScatterItemIdentifier } from '@mui/x-charts'
import { Card } from '../../components'

import { useEffect, useState } from 'react'

import { useData } from '../../../../hooks/DataContext'

interface ScatterPoint {
  x: number
  y: number
  name: string
}

const DashboardHome = () => {
  const { data } = useData();

  const [playerTotalPoints, setPlayerTotalPoints] = useState<ScatterPoint[]>([]);

  useEffect(() => {
    setPlayerTotalPoints(data.players?.map(player => ({
      x: player.seasonLog?.MP || 0,
      y: player.seasonLog?.PTS || 0,
      name: player.playerBio.name,
    })) || []);
  }, [data]);

  return (
    <>
      <Card>
        <Card.Header >      
          <h1>Dashboard Home</h1>
        </Card.Header>
        <Card.Body>
          <ScatterChart
            height={600}
            series={[
              {
                data: playerTotalPoints,
                markerSize: 7,
              },
            ]}
            onItemClick={(_: unknown, d: ScatterItemIdentifier) => console.log(d)}
            xAxis={[{ label: 'Minutes Played' }]}
            yAxis={[{ label: 'Points Scored' }]}
          />
        </Card.Body>
      </Card>
    </>
  )
}

export default DashboardHome