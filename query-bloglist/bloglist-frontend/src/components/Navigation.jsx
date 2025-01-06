import { NavLink, useNavigate } from 'react-router-dom';
import { userLogoff, useUserDispatch, useUserValue } from '../UserContext';
import {
  displayNotification,
  useNotificationDispatch,
} from '../NotificationContext';

const Navigation = () => {
  const userDispatch = useUserDispatch();
  const notificationDispatch = useNotificationDispatch();
  const user = useUserValue();
  const navigate = useNavigate();

  const padding = {
    paddingRight: 5,
  };
  const handleLogout = async event => {
    event.preventDefault();
    notificationDispatch(
      displayNotification(`${user.name} logged out successfully`)
    );
    userDispatch(userLogoff());
    navigate('/');
  };

  if (!user) {
    return (
      <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
        <div class="flex items-center flex-shrink-0 text-white mr-6">
          <span class="font-semibold text-xl tracking-tight">Blogs</span>
        </div>
      </nav>
    );
  }
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div class="flex items-center flex-shrink-0 text-white mr-6">
        <span class="font-semibold text-xl tracking-tight">Blogs</span>
      </div>
      <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div class="text-sm lg:flex-grow">
          <NavLink
            style={padding}
            to="/blogs"
            end
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            blogs
          </NavLink>
          <NavLink
            style={padding}
            to="/users"
            end
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            users
          </NavLink>
        </div>
      </div>
      <span className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 pr-4">
        Kai logged in
      </span>
      <span
        className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
        onClick={handleLogout}
      >
        logout
      </span>
    </nav>
  );
};

export default Navigation;
