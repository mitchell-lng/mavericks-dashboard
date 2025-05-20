import './header.css'

import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router'

import { faBookmark } from '@fortawesome/free-solid-svg-icons'

import { useAuth } from '../../../../hooks/Auth'

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import { useData } from '../../../../hooks/DataContext'

import Avatar from '@mui/material/Avatar';

import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { PlayerSearch } from '../index'

import { useNavigate } from 'react-router'

const Header = () => {
  // Auth
  const { logout } = useAuth()
  const handleLogout = () => {
    logout()
  }



  // Get data from context
  const { data } = useData();

  const navigate = useNavigate();

  const handlePlayerSelect = (id: number) => {
    navigate(`/dashboard/player/${id}`);
  };

  const [bookmarks, setBookmarks] = useState(data.bookmarks);

  useEffect(() => {
    setBookmarks(data.bookmarks);

    console.log('Bookmarks updated:', data.bookmarks);
  }, [data.bookmarks]);

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

  return (
    <div className="header-container">
      <PlayerSearch function={handlePlayerSelect} />
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
    </div>
  )
}

export default Header