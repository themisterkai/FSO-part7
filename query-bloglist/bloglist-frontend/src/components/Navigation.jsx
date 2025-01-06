import { NavLink, Link } from 'react-router-dom';
import './Navigation.css';
import { userLogoff, useUserDispatch, useUserValue } from '../UserContext';
import {
  displayNotification,
  useNotificationDispatch,
} from '../NotificationContext';

const Navigation = () => {
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();
  const user = useUserValue();

  const padding = {
    paddingRight: 5,
  };
  const handleLogout = async event => {
    event.preventDefault();
    notificationDispatch(
      displayNotification(`${user.name} logged out successfully`)
    );
    userDispatch(userLogoff());
  };
  return (
    <div style={{ background: 'lightgrey' }}>
      <NavLink
        style={padding}
        to="/blogs"
        end
        className={({ isActive }) => (isActive ? 'disabled-link' : '')}
      >
        blogs
      </NavLink>
      <NavLink
        style={padding}
        to="/users"
        end
        className={({ isActive }) => (isActive ? 'disabled-link' : '')}
      >
        users
      </NavLink>
      <span style={padding}>Kai logged in</span>
      <span style={padding}>
        <button className="btn" onClick={handleLogout}>
          logout
        </button>
      </span>
    </div>
  );
};

export default Navigation;
