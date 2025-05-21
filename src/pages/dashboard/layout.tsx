import { Header, Navigation } from './components'
import './dashboard.css'

import { useNavigation } from 'react-router-dom'

import { getMappedData } from '../../utils/api'

import { useData } from '../../hooks/DataContext'
import { useEffect } from 'react'

import Home from './home/Home'
import Players from './players/Players'
import Player from './player/Player'
import Leaderboard from './leaderboard/Leaderboard'
import Upload from './upload/Upload'
import Compare from './compare/Compare'
import PlayerEdit from './playerEdit/PlayerEdit'

const Layout = ({ children } : { children: React.ReactNode }) => {
  const navigation = useNavigation()
  const { data, setPlayers } = useData();

  const fetchData = async () => {
    const response = await getMappedData();

    if (response) {
      setPlayers(response);
    }
  };

  useEffect(() => {
    if ((data?.players ?? []).length === 0) {
      fetchData();           
    }
  }, [data])

  return (
    <div className="dashboard">
      <header>
        <Header />
      </header>
      <aside>      
        <Navigation />
      </aside>
      <main>
        {navigation.state === 'loading' ? (
          <div className="loading-container">
            <h3>Loading data...</h3>
          </div>
        ) : children}
      </main>
      <footer className="dashboard-footer footer">
        <p>Contact: <a href="mailto:help@mywebpage.com">help@mywebpage.com</a></p>

        <p>©{new Date().getFullYear()}</p>
      </footer>
    </div>
  )
}

Layout.home = Home
Layout.players = Players
Layout.player = Player
Layout.leaderboard = Leaderboard
Layout.upload = Upload
Layout.compare = Compare
Layout.playerEdit = PlayerEdit


export default Layout