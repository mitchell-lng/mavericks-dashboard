import logo from '../../../../assets/logo.svg'
import './navigation.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers } from '@fortawesome/free-solid-svg-icons/faUsers'

import { faTrophy } from '@fortawesome/free-solid-svg-icons/faTrophy'
import { faChartLine } from '@fortawesome/free-solid-svg-icons/faChartLine'
import { faFileImport } from '@fortawesome/free-solid-svg-icons/faFileImport'

import { NavLink } from 'react-router'

import { useLocation } from 'react-router'

const getCurrentPath = (location: any) => {
  const path = location.pathname.split('/');

  if (path.includes('player')) {
    return 'players'
  }

  if (path.length > 2) {
    return path[2] // Return the first part after the base URL
  }

  return '';
}

const Navigation = () => {
  const location = useLocation()
  const currentPath = getCurrentPath(location); // Update to use getCurrentPath

  const isActive = (link: string) => {
    return currentPath === link
  }

  return (
    <div className='sidebar'>
      <img id="logo" src={logo} alt="Mavericks Logo" width="200" height="200" />
      <nav className='sidebar-nav'>
        <ul>
          {[
            { to: '', icon: faChartLine, label: 'Dashboard' },
            { to: 'players', icon: faUsers, label: 'Players' },
            { to: 'leaderboard', icon: faTrophy, label: 'Leaderboard' },
            { to: 'upload', icon: faFileImport, label: 'Upload Data' }
          ].map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={() => (isActive(link.to) ? 'active nav-item' : 'nav-item')}
              >
                <FontAwesomeIcon icon={link.icon} />
                <span>
                  {link.label}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Navigation