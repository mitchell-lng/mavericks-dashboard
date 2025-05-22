import './home.css'

import { Card } from '../../../components'

import { useData } from '../../../hooks/DataContext'
import { NavLink } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  const { data, removeBookmark } = useData();

  return (
    <div className="dashboard-subpage-container">
      <header className="dashboard-subpage-header">
        <h1>Dashboard Home</h1>
        <div className="dashboard-subpage-header-actions">
          <button className="button-secondary button" onClick={() => window.print()}>
            <FontAwesomeIcon icon={faPrint} />
            Print
          </button>
        </div>
      </header>
      <main className="dashboard-subpage-content no-print">
        <Card>
          <Card.Header>
            <h1>Welcome!</h1>
          </Card.Header>
          <Card.Body>
            <p>Welcome to the dashboard! Here you can find various statistics and information about players.</p>
            <p>Use the navigation menu to explore different sections.</p>
            <p>For more information and resources, check the <a className='readme-link' href='https://github.com/mitchell-lng/mavericks-dashboard' target='_blank'>readme</a>.</p>
          </Card.Body>
        </Card>
        <div className='dashboard-subpage-content-item'>
          <h1>Bookmarked Players</h1>
          <div className="bookmarks-cards-container">
            {
              data.bookmarks?.length ? (
                data.bookmarks.map((bookmark, _) => (
                  <Card className='bookmarks-card' key={bookmark.playerId}>
                    <Card.Image src={bookmark.playerBio?.photoUrl ?? ''} alt={bookmark.playerBio?.name} />
                    <Card.Header>
                      <h3>{bookmark.playerBio.name}</h3>
                    </Card.Header>
                    <Card.Body>
                      <p>Height: {bookmark.playerBio?.height} in</p>
                      <p>Weight: {bookmark.measurements?.weight} lbs</p>
                      <p>Wingspan: {bookmark.measurements?.wingspan} in</p>
                      <NavLink className="button button-secondary dashboard-home-cards-button" to={`/dashboard/player/${bookmark.playerId}`}>View Player</NavLink>
                      <button className="button button-error button-secondary" onClick={() => removeBookmark(bookmark.playerId)}>Remove Bookmark</button>
                    </Card.Body>
                  </Card>
                ))
              ) : (
                <p>No bookmarks available</p>
              )
            }
          </div>
        </div>
      </main>
      <article className='only-print'>
      {data.bookmarks?.length ? (
        <table className="print-bookmarks-table">
            <thead>
            <tr>
              <th>Name</th>
              <th>League</th>
              <th>Team</th>
              <th>Home Town</th>
              <th>Home State</th>
              <th>High School</th>
            </tr>
            </thead>
            <tbody>
            {data.bookmarks.map((bookmark) => (
              <tr key={bookmark.playerId}>
              <td>{bookmark.playerBio?.name ?? 'N/A'}</td>
              <td>{bookmark.seasonLog?.League ?? 'N/A'}</td>
              <td>{bookmark.seasonLog?.Team ?? 'N/A'}</td>
              <td>{bookmark.playerBio?.homeTown ?? 'N/A'}</td>
              <td>{bookmark.playerBio?.homeState ?? 'N/A'}</td>
              <td>{bookmark.playerBio?.highSchool ?? 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookmarks available</p>
      )}
      </article>
    </div>
  )
}

export default Home