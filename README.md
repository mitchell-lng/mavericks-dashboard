# 🏀 Scouting Dashboard

A modern basketball scouting dashboard built with **React**, **MUI (Material UI)**, and **Font Awesome**. This app allows users to manage detailed player profiles, including biographical data, scouting rankings, measurements, and performance metrics.

---

## 📦 Features

- **Player Profiles**: View and manage full player data including game logs, measurements, and scouting ranks.
- **Add Player Form**: Submit new player entries through a clean and styled form, using MUI's `TextField` and custom validation.
- **Responsive UI**: Built with responsive layouts, Flexbox design, and styled through external CSS.
- **Font Awesome Icons**: Integrated across components for visual clarity.
- **Card-Based Layout**: Reusable `Card` component used for consistent white-background sections.

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

## 📝 How to Add a Player

1. Navigate to the `Upload` page.
2. Fill out the form sections:
   - **Player Bio**: Basic player data like name, birthday, team, nationality, etc.
   - **Scout Rankings**: Rankings from ESPN, The Ringer, etc.
   - **Measurements**: Detailed combine-style physical measurements.
3. Required fields are marked (e.g., first name, last name, birthdate).
4. Click Submit

---

## 🚧 Roadmap / TODOs

* Add image upload preview to photoUrl input.
* Include support for importing player stats via CSV.
* Create scouting reports for players within player page
* Update all dashboard subpages to use similar elements (ie main components)
* Compare player page
* Update responsive design
* Add items to dashboard page
  * Bookmarked players
  * welcome page
  * quick actions
* Add charts to leaderboard page
* Add top 10 ranked for each scouting report to leaderboard
* Upload Data should have an upload json optioon

## 📃 License

GNU AFFERO GENERAL PUBLIC LICENSE, more info can be found in the License.txt file.