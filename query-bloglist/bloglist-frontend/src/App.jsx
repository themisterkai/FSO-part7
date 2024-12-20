import { useEffect, useRef } from 'react';
import Notification from './components/Notification';

import { userLogin, useUserDispatch, useUserValue } from './UserContext';
import Header from './components/Header';
import RoutesComponent from './components/Routes';
import Navigation from './components/Navigation';

const App = () => {
  const userDispatch = useUserDispatch();
  const user = useUserValue();

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userFromLS = JSON.parse(loggedInUser);
      userDispatch(userLogin(userFromLS));
    }
  }, []);

  return (
    <div>
      <Header />
      <Notification />
      {user != null && <RoutesComponent />}
    </div>
  );
};

export default App;
