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
    * intern_project_data.json
    * /fonts
    * /images
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
    * `types.ts`
    * `api.ts`
    * `fieldData.ts`
  * index.css *global styles are located here*
  * main.tsx *includes all routing information*

All components are organized into folders based on their functionality. The `components` folder contains reusable components, while the `pages` folder contains the main pages of the app. The `hooks` folder contains custom hooks for authentication and data management. The `utils` folder contains utility functions and types used throughout the app.

Styles are managed through a combination of global CSS and component-specific styles. The app uses Flexbox for layout and MUI's styling system for component-specific styles.

Important files include:

* `index.css` contains global styles for the app, including typography, basic components (buttons, toasts), colors, and layout.
* `main.tsx` is the entry point of the app, where all routing and global context providers are set up.
* `intern_project_data.json` is a mock data file used to simulate player data. The data is structured as an array of player objects, each containing various attributes such as `playerBio`, `scoutRankings`, and `measurements`.
* `fieldData.ts` contains the data structure and descriptions of each field. This file is also used to generate the form for the leaderboard pages.
* `api.ts` contains the mock API functions used to fetch and manage player data. The current implementation uses a mock data file, but this can be replaced with real API calls in a production environment.

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
* 📁 Upload / Add Player Data
  * Data can be added via a form or by uploading a JSON file.
  * The context manages the state of the uploaded data, ensuring:
    * Immediate availability across components
    * Easy access to player data for rendering and analysis

### Example Usage

This example shows how both data and toasts from the useContext can be used.

This context could eventually be used to replace the current mock data with real API calls, allowing for dynamic updates and real-time data fetching. This would enable quick updates and ensuring that users always have access to the most current information.

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
The app uses a mock data file (`intern_project_data.json`) to simulate player data. The data is structured as an array of player objects, each containing various attributes such as `playerBio`, `scoutRankings`, and `measurements`. The app fetches this data using a custom API function, which can be replaced with real API calls in a production environment.

In the future the api.ts file will be replaced with a real API. The current implementation uses a mock data file (`intern_project_data.json`) to simulate player data. The data is structured as an array of player objects, each containing various attributes such as `playerBio`, `scoutRankings`, and `measurements`. The app fetches this data using a custom API function, which can be replaced with real API calls in a production environment.

Data can be uploaded using the `Upload` page, which allows users to fill out a form with player information. The form includes sections for player bio, scout rankings, measurements, and game logs. The data is then stored in the global context and can be accessed from any component in the app. Otherwise the data can be uploaded using a json file. There is a button to upload a json file. The file must be in the correct format, otherwise it will not be uploaded.

The data is structured as follows:

```json
[
  {
    "playerId": 1,
    "playerBio": {
      "name": "John Doe",
      "playerId": 1,
      ...
    },
    "gameLogs": [
      {
        "playerId": 1,
        "gameId": 101,
        ...
      },
      ...
    ],
    "seasonLog": {
      "playerId": 1,
      "age": "20",
      ...
    },
    "scoutRanking": {
      "playerId": 1,
      "ESPN Rank": null,
      ...
    },
    "measurements": {
      "playerId": 1,
      "heightNoShoes": null,
      ...
    }
  },
  ...
]
```

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

For more details on the data structure please refer to the `fieldData.ts` file. The file contains the data structure and descriptions of each field. 

This file is also used to generate the form for the leaderboard pages.

## Usage

### How to Run the Project
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd scouting-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173`. (Fun fact about Vite's [default port](https://www.reddit.com/r/programming/comments/xh1vyr/fun_fact_vites_default_port_is_5173_which_spells/))
5. Login using the default credentials (listed in the Authentication section).
6. Explore the app, add players, and view player profiles.

### How to Build the Project
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd scouting-dashboard
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Build the project:
   ```bash
   npm run build
   ```
4. The build files will be generated in the `dist` folder.
5. You can deploy the contents of the `dist` folder to your web server or hosting service.
6. Open your browser and navigate to the deployed URL.
7. Login using the default credentials (listed in the Authentication section).
8. Explore the app, add players, and view player profiles.
9. To run the app locally, you can use a local server like `http-server` or `serve`:
   ```bash
   npm install -g http-server
   http-server dist
   ```

### 📝 How to Add a Player

1. Navigate to the `Upload` page.
2. Fill out the form sections (only player bio is required):
   - **Player Bio**: Basic player data like name, birthday, team, nationality, etc.
   - **Scout Rankings**: Rankings from ESPN, The Ringer, etc.
   - **Measurements**: Detailed combine-style physical measurements.
3. Required fields are marked (e.g., first name, last name, birthdate).
4. Click Submit

### How to add a Scouting Report

1. Navigate to the player's individual page.
2. Fill out the form sections.
3. Click on the `Add Scouting Report` button.
4. The scouting report will be added to the player page.

---

## 🚧 Roadmap / TODOs

* Player Page
  * Add player game logs
  * Add player season logs
  * Add player measurements
  * Add player combine stats
  * Add player shooting charts
* Update / Verify responsive design
  * dashboard
    * home
    * players
    * player
    * leaderboard
    * upload
    * compare
  * login

## 📃 License

GNU AFFERO GENERAL PUBLIC LICENSE, more info can be found in the `License.txt` file.