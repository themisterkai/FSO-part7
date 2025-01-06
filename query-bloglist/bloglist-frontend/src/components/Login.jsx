import loginServices from '../services/login';
import { userLogin, useUserDispatch } from '../UserContext';
import {
  displayNotification,
  displayNotificationError,
  useNotificationDispatch,
} from '../NotificationContext';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();
  const navigate = useNavigate();

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
      navigate('/');
    } catch (e) {
      notificationDispatch(displayNotificationError(e.response.data.error));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          log in to applicaton
        </h2>
        <form onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              username
            </label>
            <input
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              type="text"
              value={username}
              name="Username"
              data-testid="username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              password
            </label>
            <input
              className="w-full mt-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              type="password"
              value={password}
              name="Password"
              data-testid="password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <div className="pt-6">
            <button
              className="w-full bg-teal-600 text-white p-3 rounded-lg hover:bg-teal-700 focus:ring-4 focus:ring-teal-300 transition duration-300"
              type="submit"
            >
              login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

Login.displayName = 'Login';
