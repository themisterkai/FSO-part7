import {
  displayNotification,
  useNotificationDispatch,
} from '../NotificationContext';
import { userLogoff, useUserDispatch, useUserValue } from '../UserContext';
import Login from './Login';

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
      {user == null && <Login />}
      {user != null && (
        <div>
          <div>{user.name} logged in</div>
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
    </>
  );
};

export default Header;
