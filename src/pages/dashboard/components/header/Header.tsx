import './header.css'

import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router'

import { faBookmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

import InputAdornment from '@mui/material/InputAdornment';

import { useAuth } from '../../../../hooks/Auth'

import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useData } from '../../../../hooks/DataContext'

import { TextField } from '@mui/material'

import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

interface SearchResult {
  id: number
  name: string
  link: string
}

interface SearchResults {
  results: SearchResult[]
}

const Header = () => {
  // Auth
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
  }

  // Get data from context
  const { data } = useData();
  const [bookmarks, setBookmarks] = useState(data.bookmarks);

  useEffect(() => {
    setBookmarks(data.bookmarks);

    console.log('Bookmarks updated:', data.bookmarks);
  }, [data.bookmarks]);

  // Search
  const [search, setSearch] = useState('')  
  const [searchResults, setSearchResults] = useState<SearchResults>({ results: [] })
  const [searchEl, setSearchEl] = useState<null | HTMLElement>(null);

  const searchOpen = Boolean(searchEl);
  const handleSearchClick = (event: React.MouseEvent<HTMLElement>) => {
    setSearchEl(event.currentTarget);
  };

  const handleSearchClose = () => {
    setSearchEl(null);
  };

  // Account menu
  const [accountEl, setAccountEl] = useState<null | HTMLElement>(null);
  const accountOpen = Boolean(accountEl);
  const handleAccountClick = (event: React.MouseEvent<HTMLElement>) => {
    setAccountEl(event.currentTarget);
  };

  const handleAccountClose = () => {
    setAccountEl(null);
  };

  // Bookmarks menu
  const [bookmarkEl, setBookmarkEl] = useState<null | HTMLElement>(null);
  const bookmarkOpen = Boolean(bookmarkEl);
  const handleBookmarkClick = (event: React.MouseEvent<HTMLElement>) => {
    setBookmarkEl(event.currentTarget);
  };
  
  const handleBookmarkClose = () => {
    setBookmarkEl(null);
  };

  useEffect(() => {
    setSearchResults({
      results: data.players?.filter((player) => {
        if (search === '') return false;
        return player.playerBio.name.toLowerCase().includes(search.toLowerCase());
      }).map((player) => ({
        id: player.playerId,
        name: player.playerBio.name,
        link: `/dashboard/player/${player.playerId}`,
      })) || [],
    });
  }, [search]);

  return (
    <div className="header-container">
      <div className='search-container'>
        <TextField
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onClick={handleSearchClick}
          id="search"
          label="Search"
          variant="standard"
          size="small"
          aria-controls={searchOpen ? 'search-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={searchOpen ? 'true' : undefined}
          slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="start">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </InputAdornment>
            ),
          },
        }}
        />
      </div>
      <div id="search_results">
        <ul>
          {searchResults.results.map(result => (
            <li key={result.id}><NavLink to={result.link}>{result.name}</NavLink></li>
          ))}
        </ul>
      </div>
      <div id="header-icons">
        <Tooltip title="Bookmarks">
          <IconButton
            size="small"
            onClick={handleBookmarkClick}
            sx={{ ml: 2 }}
            aria-controls={bookmarkOpen ? 'bookmark-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={bookmarkOpen ? 'true' : undefined}
          >
            <FontAwesomeIcon icon={faBookmark} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleAccountClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={accountOpen ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={accountOpen ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </div>
      <Menu
        anchorEl={accountEl}
        id="account-menu"
        open={accountOpen}
        onClose={handleAccountClose}
        onClick={handleAccountClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <NavLink to="/settings">
          <MenuItem onClick={handleAccountClose}>
            <ListItemIcon>
              <FontAwesomeIcon icon={faGear} />
            </ListItemIcon>
            Settings
          </MenuItem>
        </NavLink>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
      <Menu
        anchorEl={bookmarkEl}
        id="bookmark-menu"
        open={bookmarkOpen}
        onClose={handleBookmarkClose}
        onClick={handleBookmarkClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
          (bookmarks === undefined) || (bookmarks.length === 0) ? (
            <MenuItem onClick={handleBookmarkClose}>
              No bookmarks available
            </MenuItem>
          ) : (
            bookmarks?.map((bookmark) => (
              <NavLink to={`/dashboard/player/${bookmark.playerBio.playerId}`} key={bookmark.playerBio.playerId}>
                <MenuItem onClick={handleBookmarkClose}>
                  <ListItemIcon>
                    <Avatar src={bookmark.playerBio.photoUrl ?? ''} />
                  </ListItemIcon>
                  {bookmark.playerBio.name}
                </MenuItem>
              </NavLink>
            ))
          )
        }
      </Menu>
      <Menu
        anchorEl={searchEl}
        id="search-menu"
        open={searchOpen}
        onClose={handleSearchClose}
        onClick={handleSearchClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {
          searchResults.results.length === 0 ? (
            <MenuItem onClick={handleSearchClose}>
              No results found
            </MenuItem>
          ) : (
            searchResults.results.map((result) => (
              <NavLink to={result.link} key={result.id}>
                <MenuItem onClick={handleSearchClose}>
                  <ListItemIcon>
                    <Avatar src={result.link} />
                  </ListItemIcon>
                  {result.name}
                </MenuItem>
              </NavLink>
            ))
          )
        }
      </Menu>
    </div>
  )
}

export default Header