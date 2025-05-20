import './home.css'

import { Card } from '../components'

import { useData } from '../../../hooks/DataContext'
import { NavLink } from 'react-router';

const Home = () => {
  const { data, removeBookmark } = useData();

  return (
    <div className="dashboard-subpage-container">
      <header className="dashboard-subpage-header">
        <h1>Dashboard Home</h1>
      </header>
      <main className="dashboard-subpage-content">
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
    </div>
  )
}

export default Home