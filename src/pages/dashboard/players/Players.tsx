import './players.css'

import { DataGrid } from '@mui/x-data-grid'

import { NavLink } from 'react-router'

import { useEffect, useState } from 'react'
import type { JSX } from 'react'

import type { FullPlayerData } from '../../../utils/types'

import { useData } from '../../../hooks/DataContext'

import { useTheme, useMediaQuery } from '@mui/material';

interface ActionsColumnParams {
  row: {
    id: number;
    [key: string]: any;
  };
}

interface ActionsColumn {
  field: string;
  headerName: string;
  flex: number;
  renderCell: (params: ActionsColumnParams) => JSX.Element;
}

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

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  const baseColumns = [
    { field: 'name', headerName: 'Name', flex: 1 },
  ];

  const bioColumns = [
    { field: 'height', headerName: 'Height', flex: 0.5 },
    { field: 'weight', headerName: 'Weight', flex: 0.5 },
  ];

  const rankingColumns = [
    { field: 'espn', headerName: 'ESPN', flex: 0.5, sortComparator },
    { field: 'samvecenie', headerName: 'Sam Vecenie', flex: 0.5, sortComparator },
    { field: 'kevinoconnor', headerName: "Kevin O'Connor", flex: 0.5, sortComparator },
    { field: 'kyleboone', headerName: 'Kyle Boone', flex: 0.5, sortComparator },
    { field: 'garyparrish', headerName: 'Gary Parrish', flex: 0.5, sortComparator },
  ];


  const actionsColumn: ActionsColumn = {
    field: 'actions',
    headerName: 'Actions',
    flex: 2,
    renderCell: (params: ActionsColumnParams) => (
      <div className='players-actions'>
        <NavLink to={`/dashboard/player/${params.row.id}`} className='button'>
          View Profile
        </NavLink>
        <button
          className={`button button-secondary ${findBookmark(params.row.id) ? ' button-error ' : 'button-success'}`}
          onClick={() => { handleBookmark(params.row.id); }}>
          {findBookmark(params.row.id) ? 'Remove Bookmark' : 'Add Bookmark'}
        </button>
      </div>
    ),
  };

  // Choose columns based on screen size
  let columns = [...baseColumns, actionsColumn];
  if (isMedium) {
    columns = [...baseColumns, ...bioColumns, rankingColumns[0], actionsColumn]; // Show only ESPN on medium screens
  } else if (!isSmall) {
    columns = [...baseColumns, ...bioColumns, ...rankingColumns, actionsColumn]; // Show all on large screens
  }

  return (
    <div className='dashboard-subpage-container player-page'>
      <header className="dashboard-subpage-header">
        <h1>Players</h1>
      </header>
      <main className="dashboard-subpage-content players-list">
        <DataGrid
          rows={playerList.map((player) => ({
            id: player.playerId,
            name: player.playerBio.name,
            height: `${Math.floor(player.playerBio.height / 12)}'${player.playerBio.height % 12}"`, // Convert inches to feet and inches
            weight: player.playerBio.weight,
            espn: player.scoutRanking?.['ESPN Rank'],
            samvecenie: player.scoutRanking?.['Sam Vecenie Rank'],
            kevinoconnor: player.scoutRanking?.["Kevin O'Connor Rank"],
            kyleboone: player.scoutRanking?.['Kyle Boone Rank'],
            garyparrish: player.scoutRanking?.['Gary Parrish Rank'],
            }))}
              
          columns={columns}

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