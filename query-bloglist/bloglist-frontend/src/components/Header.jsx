import { useUserValue } from '../UserContext';
import Login from './Login';
import Navigation from './Navigation';
import Notification from './Notification';

const Header = () => {
  const user = useUserValue();

  return (
    <>
      <Navigation />
      <Notification />
      {user == null && <Login />}
    </>
  );
};

export default Header;
