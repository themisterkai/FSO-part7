import { useState, useEffect, useRef } from 'react';
import Login from './components/Login';
import AddBlog from './components/AddBlog';
import Notification from './components/Notification';
import loginServices from './services/login';
import Togglable from './components/Toggable';
import {
  displayNotification,
  displayNotificationError,
  useNotificationDispatch,
} from './NotificationContext';
import BlogList from './components/BlogList';
import {
  userLogin,
  userLogoff,
  useUserDispatch,
  useUserValue,
} from './UserContext';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const notificationDispatch = useNotificationDispatch();
  const userDispatch = useUserDispatch();
  const user = useUserValue();

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userFromLS = JSON.parse(loggedInUser);
      userDispatch(userLogin(userFromLS));
    }
  }, []);

  const blogsFormRef = useRef();

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const userFromLogin = await loginServices.login({
        username,
        password,
      });
      userDispatch(userLogin(userFromLogin));
      setUsername('');
      setPassword('');
      notificationDispatch(
        displayNotification(`${userFromLogin.name} successfully logged in`)
      );
    } catch (e) {
      notificationDispatch(displayNotificationError(e.response.data.error));
    }
  };

  const handleLogout = async event => {
    event.preventDefault();
    notificationDispatch(
      displayNotification(`${user.name} logged out successfully`)
    );
    userDispatch(userLogoff());
  };

  return (
    <div>
      <Notification />
      {user == null && (
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user != null && (
        <div>
          <div>{user.name} logged in</div>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="create" ref={blogsFormRef}>
            <AddBlog />
          </Togglable>
          <h2>blogs</h2>
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
