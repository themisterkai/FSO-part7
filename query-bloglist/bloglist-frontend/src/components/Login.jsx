import loginServices from '../services/login';
import { userLogin, useUserDispatch } from '../UserContext';
import {
  displayNotification,
  displayNotificationError,
  useNotificationDispatch,
} from '../NotificationContext';
import { useState } from 'react';

const Login = () => {
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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

  return (
    <>
      <h2>log in to applicaton</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            data-testid="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            data-testid="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

export default Login;

Login.displayName = 'Login';
