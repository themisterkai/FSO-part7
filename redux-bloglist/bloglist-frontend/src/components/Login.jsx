import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { displayNotification } from '../reducers/notificationReducer';
import { setUserAndToken } from '../reducers/userReducer';
import loginServices from '../services/login';

const Login = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const userFromLogin = await loginServices.login({
        username,
        password,
      });
      dispatch(setUserAndToken(userFromLogin));
      window.localStorage.setItem(
        'loggedInUser',
        JSON.stringify(userFromLogin)
      );
      dispatch(
        displayNotification(`${userFromLogin.name} successfully logged in`)
      );
    } catch (e) {
      dispatch(displayNotification(e.response.data.error, true));
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
// Login.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   setUsername: PropTypes.func.isRequired,
//   password: PropTypes.string.isRequired,
//   setPassword: PropTypes.func.isRequired,
// };
