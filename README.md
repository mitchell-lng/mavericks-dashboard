# 🏀 Scouting Dashboard

A modern basketball scouting dashboard built with **React**, **MUI (Material UI)**, and **Font Awesome**. This app allows users to manage detailed player profiles, including biographical data, scouting rankings, measurements, and performance metrics. The key features are listed below.

For a live demo, visit [Scouting Dashboard](https://earnest-entremet-6bfad3.netlify.app/dashboard).

---

## 📦 Features

- **Player Profiles**: View and manage full player data including game logs, measurements, and scouting ranks.
- **Add Player Form**: Submit new player entries through a clean and styled form, using MUI's `TextField` and custom validation.
- **Responsive UI**: Built with responsive layouts, Flexbox design, and styled through external CSS.
- **Font Awesome Icons**: Integrated across components for visual clarity.
- **Card-Based Layout**: Reusable `Card` component used for consistent white-background sections.
- **Player Search**: Search for players using a search bar, with results displayed in a card format.
- **Data Visualization**: Charts and graphs to visualize player performance metrics.
- **Persistent State**: Use of React Context API to manage global state, including player data and bookmarks.
- **Custom Toast Notifications**: Global toast notifications for user feedback on actions.
- **Customizable Leaderboard**: View and manage player rankings, with options to filter and sort data.
- **User Authentication**: Basic user authentication with login and registration pages.
- **Error Handling**: Error page for 404 and other HTTP errors.

---

## Authentication
The app uses a mock authentication system for demonstration purposes, and the login credentials are hardcoded. The authentication state is stored in the browser's local storage, allowing users to remain logged in even after refreshing the page. The app uses a custom hook to manage authentication and provide user data across components.

The default credentials for testing are:
- **Login**: `user`
- **Password**: `password`

---

## 📁 Project Structure

* /public
* /src
  * /assets
    * /fonts
    * data.json
  * /components
    * Card
  * /hooks
    * Auth
    * DataContext
  * /pages
    * /dashboard *all subpages are included here*
    * /login
    * /oops
    * /register
    * /settings
  * utils
    * types.ts
    * api.ts
  * index.css *global styles are located here*
  * main.tsx *includes all routing information*

---

## 🧑‍💻 Technologies Used

- [React](https://react.dev/)
- [Material UI (MUI)](https://mui.com/)
- [Font Awesome](https://fontawesome.com/)
- [MUI X Charts](https://mui.com/x/react-charts/) (for ScatterChart, Radar, etc.)
- Custom CSS

---

## 🔁 Global State with React Context

The app leverages React's useContext API to share data and functions across components efficiently.

* 🔖 Bookmark Players
  * Users can bookmark their favorite players using a global context, allowing:
  * Quick access from any page
  * Persistent state across sessions (if paired with localStorage or backend sync)
  * Real-time UI updates
* ⚡ Load Player Data Faster
  * By caching fetched player data in context:
    * Avoids redundant API/database calls when revisiting player pages
    * Supports shared access to player bio, measurements, and rankings
    * Reduces perceived latency for end users
* 🔔 Custom Toast Alerts
  * Toast notifications are handled globally to:
    * Confirm successful actions (e.g. “Player added successfully”)
    * Show errors (e.g. “Failed to load rankings”)
    * Use a consistent design system

### Example Usage

This example shows how both data and toasts from the useContext can be used.

```tsx
import { useData } from '../../../../hooks/DataContext'
import type { FullPlayerData } from '../../../utils/type.ts'

export default const Element = () => {
  const { data, addToast } = useData();

  const handleClick = () => {
    addToast('This is a toast!', 'success');
  }

  return (
    <>
      <ul>
        {
          data.players.map((player : FullPlayerData) => {
            return (
              <li>{ player.playerBio.name }</li>
            )
          })
        }
      </ul>
      <button className="button" onClick={handleClick}>Show a toast!</button>
    </>
  )
}
```

## Data Management
The app uses a mock data file (`data.json`) to simulate player data. The data is structured as an array of player objects, each containing various attributes such as `playerBio`, `scoutRankings`, and `measurements`. The app fetches this data using a custom API function, which can be replaced with real API calls in a production environment.

The data structure can be mapped using the following types in `types.ts`:

```ts
interface PlayerBio {
  name: string;
  playerId: number;
  ... // other player attributes
}

interface ScoutRanking {
  playerId: number;
  "ESPN Rank": number | null;
  ... // other rankings
}

interface PlayerMeasurements {
  playerId: number;
  heightNoShoes?: number | null;  // in inches
  ... // other measurements
}

interface GameLog {
  playerId: number;
  gameId: number;
  ... // other game stats
}

interface SeasonLog {
  playerId: number; // Unique identifier for the player
  age: string; // Player's age as a string
  ... // other season stats
}
```

```ts
interface FullPlayerData {
  playerId: number;
  playerBio: PlayerBio;
  gameLogs: GameLog[];
  seasonLog?: SeasonLog;
  scoutRanking?: ScoutRanking;
  measurements?: PlayerMeasurements;
}
```

For more details on the data structure please refer to the `fieldData.ts` file. The file contains the data structure and desciprtions of each field. This file is used to generate the form for the leaderboard pages.

The data is fetched using the `getData` function in `api.ts`, which can be modified to fetch data from a real API or database. Since this is the only interface to the data, it is easy to swap out the mock data for real data in the future.

## 📝 How to Add a Player

1. Navigate to the `Upload` page.
2. Fill out the form sections (only player bio is required):
   - **Player Bio**: Basic player data like name, birthday, team, nationality, etc.
   - **Scout Rankings**: Rankings from ESPN, The Ringer, etc.
   - **Measurements**: Detailed combine-style physical measurements.
3. Required fields are marked (e.g., first name, last name, birthdate).
4. Click Submit

---

## 🚧 Roadmap / TODOs

* Add image upload preview to photoUrl input.
* Include support for importing player stats via json file.
* Create scouting reports for players within player page
* Compare player page
* Update / Verify responsive design
  * dashboard home
  * players
  * player
  * leaderboard
  * upload data
  * compare player page

## 📃 License

GNU AFFERO GENERAL PUBLIC LICENSE, more info can be found in the License.txt file.