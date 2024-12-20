import {
  displayNotification,
  useNotificationDispatch,
} from '../NotificationContext';
import { userLogoff, useUserDispatch, useUserValue } from '../UserContext';
import Login from './Login';
import Navigation from './Navigation';

const Header = () => {
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();
  const user = useUserValue();

  const handleLogout = async event => {
    event.preventDefault();
    notificationDispatch(
      displayNotification(`${user.name} logged out successfully`)
    );
    userDispatch(userLogoff());
  };

  return (
    <>
      {user != null && <Navigation />}
      <h1>blogs</h1>
      {user == null && <Login />}
    </>
  );
};

export default Header;
