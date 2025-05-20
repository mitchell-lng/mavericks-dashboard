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

  // This is used to sort the columns that can have null values
  const sortComparator = (v1: number | null, v2: number | null) => {
    if (v1 == null && v2 == null) return 0;
    if (v1 == null) return 1;
    if (v2 == null) return -1;
    return v1 - v2;
  }

  return (
    <div className='dashboard-subpage-container'>
      <header className="dashboard-subpage-header">
        <h1>Players</h1>
      </header>
      <main className="dashboard-subpage-content">
        <DataGrid
          rows={playerList.map((player) => ({
            id: player.playerId,
            name: player.playerBio.name,
            age: new Date().getFullYear() - new Date(player.playerBio.birthDate).getFullYear(),
            height: `${Math.floor(player.playerBio.height / 12)}'${player.playerBio.height % 12}"`, // Convert inches to feet and inches
            weight: player.playerBio.weight,
            espn: player.scoutRanking?.['ESPN Rank'],
            samvecenie: player.scoutRanking?.['Sam Vecenie Rank'],
            kevinoconnor: player.scoutRanking?.["Kevin O'Connor Rank"],
            kyleboone: player.scoutRanking?.['Kyle Boone Rank'],
            garyparrish: player.scoutRanking?.['Gary Parrish Rank'],
            }))}
              
          columns={[
            { field: 'name', headerName: 'Name', flex: 1 },
            { field: 'age', headerName: 'Age', type: 'number', align: 'left', headerAlign: 'left', flex: 0.5,
              sortComparator: sortComparator
            },
            { field: 'height', headerName: 'Height', flex: 0.5 },
            { field: 'weight', headerName: 'Weight', flex: 0.5 },
            { field: 'espn', headerName: 'ESPN', flex: 0.5,
              sortComparator: sortComparator
            },
            { field: 'samvecenie', headerName: 'Sam Vecenie', flex: 0.5,
              sortComparator: sortComparator
            },
            { field: 'kevinoconnor', headerName: "Kevin O'Connor", flex: 0.5,
              sortComparator: sortComparator
            },
            { field: 'kyleboone', headerName: 'Kyle Boone', flex: 0.5,
              sortComparator: sortComparator
            },
            { field: 'garyparrish', headerName: 'Gary Parrish', flex: 0.5,
              sortComparator: sortComparator
            },
            {
              field: 'actions',
              headerName: 'Actions',
              flex: 2,
              renderCell: (params) => (
                <div className='players-actions'>
                  <NavLink to={`/dashboard/player/${params.row.id}`} className='button'>
                    View Profile
                  </NavLink>
                  <button className={`button button-secondary ${findBookmark(params.row.id) ? ' button-error ' : 'button-success'}`} onClick={() =>{handleBookmark(params.row.id); }}>
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
      </main>
    </div>
  )
}

export default Players