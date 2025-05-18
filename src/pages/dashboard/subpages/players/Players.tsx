import './players.css'

import { DataGrid } from '@mui/x-data-grid'

import { NavLink } from 'react-router'

import { useEffect, useState } from 'react'

import type { FullPlayerData } from '../../../../utils/types'

import { useData } from '../../../../hooks/DataContext'

const Players = () => {
  const { data, addBookmark, removeBookmark } = useData();
  const [bookmarks, setBookmarks] = useState(data.bookmarks || []);

  useEffect(() => {
    setBookmarks(data.bookmarks || []);
  }, [data.bookmarks]);

  const [playerList, setPlayerList] = useState<FullPlayerData[]>([])

  useEffect(() => {
    setPlayerList(data.players || [])
  }, [data.players])

  const handleBookmark = (playerId: number) => {
    if (bookmarks.find((bookmark) => bookmark.playerId === playerId)) {
      removeBookmark(playerId);
    }
    else {
      const player = playerList.find((player) => player.playerId === playerId);
      if (player) {
        addBookmark(player);
      }
    }
  }

  const findBookmark = (playerId: number) => {
    return bookmarks.find((bookmark) => bookmark.playerId === playerId);
  }

  return (
    <>
      <h1>Players</h1>
      <div className='list'>
        <DataGrid
          rows={playerList.map((player) => ({
            id: player.playerId,
            name: player.playerBio.name,
            age: new Date().getFullYear() - new Date(player.playerBio.birthDate).getFullYear(),
            height: `${Math.floor(player.playerBio.height / 12)}'${player.playerBio.height % 12}"`, // Convert inches to feet and inches
            weight: player.playerBio.weight,
            league: player.playerBio.league,
            team: player.playerBio.currentTeam,
            nationality: player.playerBio.nationality,
          }))}
          
          columns={[
            { field: 'name', headerName: 'Name', flex: 1 },
            { field: 'age', headerName: 'Age', type: 'number', align: 'left', headerAlign: 'left', flex: 0.5 },
            { field: 'height', headerName: 'Height', flex: 0.5 },
            { field: 'weight', headerName: 'Weight', flex: 0.5 },
            { field: 'league', headerName: 'League', flex: 1 },
            { field: 'team', headerName: 'Team', flex: 1 },
            { field: 'nationality', headerName: 'Nationality', flex: 1 },
            {
              field: 'actions',
              headerName: 'Actions',
              flex: 2,
              renderCell: (params) => (
                <div className='players-actions'>
                  <NavLink to={`/dashboard/player/${params.row.id}`} className='button'>
                    View Profile
                  </NavLink>
                  <button className={`button button-secondary ${findBookmark(params.row.id) ? ' button-error ' : 'button-success'}`} onClick={() => {handleBookmark(params.row.id); }}>
                    {findBookmark(params.row.id) ? 'Remove Bookmark' : 'Add Bookmark'}
                  </button>
                </div>
              ),
            },
          ]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 20 },
            },
          }}
          pageSizeOptions={[10, 20, 50]}
        />
      </div>
    </>
  )
}

export default Players