import { useEffect, useRef } from 'react';
import Login from './components/Login';
import AddBlog from './components/AddBlog';
import Notification from './components/Notification';
import Togglable from './components/Toggable';
import { useDispatch, useSelector } from 'react-redux';
import BlogList from './components/BlogList';
import { setUserAndToken } from './reducers/userReducer';
import UserHeader from './components/UserHeader';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);

  const blogsFormRef = useRef();

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userFromLS = JSON.parse(loggedInUser);
      dispatch(setUserAndToken(userFromLS));
    }
  }, []);

  return (
    <div>
      <Notification />
      {user == null && <Login />}
      {user != null && (
        <div>
          <UserHeader />
          <Togglable buttonLabel="create" ref={blogsFormRef}>
            <AddBlog blogsFormRef={blogsFormRef} />
          </Togglable>
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
