# 🏀 Scouting Dashboard

A modern basketball scouting dashboard built with **React**, **MUI (Material UI)**, and **Font Awesome**. This app allows users to manage detailed player profiles, including biographical data, scouting rankings, measurements, and performance metrics.

---

## 📦 Features

- **Player Profiles**: View and manage full player data including game logs, measurements, and scouting ranks.
- **Add Player Form**: Submit new player entries through a clean and styled form, using MUI's `TextField` and custom validation.
- **Responsive UI**: Built with responsive layouts, Flexbox design, and styled through external CSS.
- **Font Awesome Icons**: Integrated across components for visual clarity.
- **Card-Based Layout**: Reusable `Card` component used for consistent white-background sections.
- **Custom Chart Labels**: Support for labeled points in `ScatterChart` (via MUI X Charts).

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
    * /dashboard
    * /login
    * /oops
    * /register
    * /settings
  * utils
    * types.ts
    * api.ts


---

## 🧑‍💻 Technologies Used

- [React](https://react.dev/)
- [Material UI (MUI)](https://mui.com/)
- [Font Awesome](https://fontawesome.com/)
- [MUI X Charts](https://mui.com/x/react-charts/) (for ScatterChart, Radar, etc.)
- Custom CSS (no Tailwind)

---

## 🔁 Global State with React Context

The app leverages React's useContext API to share data and functions across components efficiently.

### ✅ Features Supported by Context
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
    * Use a consistent design system (via MUI Snackbar or a custom component)

### Example Usage

```tsx
import { useData } from '../../../../hooks/DataContext'

export default const Element = () => {
  const { addToast } = useData();

  const handleClick = () => {
    addToast('This is a toast!', 'success');
  }

  return (
    <button className="button" onClick={handleClick}>Show a toast!</button>
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
4. Submit to update your database or internal state.

---

## 🧪 Custom Charts

Using MUI's `<ScatterChart />` with labeled points:

```tsx
<ScatterChart
  series={[
    {
      label: 'Players',
      data: [{ x: 1, y: 2, name: 'Jalen Carter' }],
      label: {
        visible: true,
        format: (point) => point.name,
      },
    },
  ]}
  sx={{
    '.MuiChartsLabel-root': {
      fontSize: 12,
      fill: '#333',
    },
  }}
/>
```

## 📌 Customization Tips

* Icons: Replace any MUI icons with <i className="fa-solid fa-..."></i>.
* CSS: Keep component styling external in PlayerProfile.css.
* Form Validation: Add custom logic with useState to manage required fields.

## 🚧 Roadmap / TODOs

* Hook up form submission to backend or Firestore.
* Add image upload preview to photoUrl input.
* Implement multi-tab navigation in player profiles.
* Include support for importing player stats via CSV.

## 📃 License

GNU AFFERO GENERAL PUBLIC LICENSE, more info can be found in the License.txt file.

## Other Comments

Let me know if you'd like a section for API endpoints, contributor credits, or deployment instructions!
