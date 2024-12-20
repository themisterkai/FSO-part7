import { useDispatch, useSelector } from 'react-redux';
import { displayNotification } from '../reducers/notificationReducer';
import { logOff } from '../reducers/userReducer';

const UserHeader = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const handleLogout = async event => {
    event.preventDefault();
    dispatch(displayNotification(`${user.name} logged out successfully`));
    dispatch(logOff());
  };

  return (
    <>
      <div>{user.name} logged in</div>
      <button onClick={handleLogout}>logout</button>
    </>
  );
};

export default UserHeader;
