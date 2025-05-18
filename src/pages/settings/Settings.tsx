import {
  Avatar,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faIdBadge,
  faLock,
  faBell,
  faGear,
  faPlug,
  faUpload,
  faFloppyDisk,
  faEye,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import "./settings.css";
import { NavLink } from "react-router-dom";

const Settings = () => {
  return (
    <div className="settings-page">
      <header className="settings-header">
        <NavLink to="/dashboard" className="button">
          <FontAwesomeIcon icon={faArrowLeft} />
          Back to Dashboard
        </NavLink>
        <h1>Settings</h1>
      </header>

      <main className="settings-main">
        <aside className="settings-sidebar">
          <ul>
            {[
              { text: "Profile", icon: faUser },
              { text: "Account", icon: faIdBadge },
              { text: "Security", icon: faLock },
              { text: "Notifications", icon: faBell },
              { text: "Preferences", icon: faGear },
              { text: "Integrations", icon: faPlug },
            ].map((item) => (
              <li key={item.text} className="sidebar-item">
                <span className="icon"><FontAwesomeIcon icon={item.icon} /></span>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </aside>

        <section className="settings-content">
          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Profile Settings</h2>
                <p>Update your personal information and avatar</p>
              </div>
              <button className="button button-secondary">
                <FontAwesomeIcon icon={faUpload} />
                Upload
              </button>
            </div>
            <div className="panel-body flex-row">
              <Avatar
                src="https://api.dicebear.com/7.x/notionists/svg?scale=200&seed=4271"
                sx={{ width: 96, height: 96 }}
              />
              <div className="profile-form">
                <div className="flex-row gap">
                  <TextField fullWidth label="Full Name" defaultValue="Jordan Bell" />
                  <TextField fullWidth label="Email Address" disabled value="jordan.bell@email.com" />
                </div>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  minRows={4}
                  placeholder="Tell us something about yourself"
                />
              </div>
            </div>
            <div className="panel-footer">
              <button className="button">
                <FontAwesomeIcon icon={faFloppyDisk} />
                Save
              </button>
            </div>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div>
                <h2>Account Settings</h2>
                <p>Manage your account settings and preferences</p>
              </div>
            </div>
            <div className="panel-body">
              <div className="flex-row gap">
                <TextField
                  fullWidth
                  label="Current Password"
                  type="password"
                  InputProps={{ endAdornment: <FontAwesomeIcon icon={faEye} /> }}
                  defaultValue="••••••••"
                />
                <TextField fullWidth label="New Password" type="password" />
                <TextField fullWidth label="Confirm Password" type="password" />
              </div>
            </div>
            <div className="panel-footer">
              <button className="button">
                <FontAwesomeIcon icon={faFloppyDisk} />
                Save
              </button>
            </div>
            <hr />
            <div className="flex-row space-between align-center">
              <div>
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account</p>
              </div>
              <FormControlLabel control={<Switch defaultChecked />} label="Enabled" />
            </div>
          </div>
        </section>
      </main>
      <footer className="settings-footer footer">
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}

export default Settings;