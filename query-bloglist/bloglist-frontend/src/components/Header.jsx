import { useUserValue } from '../UserContext';
import Login from './Login';
import Navigation from './Navigation';
import Notification from './Notification';

const Header = () => {
  const user = useUserValue();

  return (
    <>
      {user != null && <Navigation />}
      <Notification />
      <h1>blogs</h1>
      {user == null && <Login />}
    </>
  );
};

export default Header;
