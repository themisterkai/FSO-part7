import { useEffect, useRef } from 'react';
// import AddBlog from './components/AddBlog';
import Notification from './components/Notification';

// import Togglable from './components/Toggable';
// import BlogList from './components/BlogList';
import { userLogin, useUserDispatch, useUserValue } from './UserContext';
import Header from './components/Header';
import RoutesComponent from './components/Routes';
import ToggableCreate from './components/ToggableCreate';

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

  // const blogsFormRef = useRef();

  return (
    <div>
      <Notification />
      <Header />
      {user != null && (
        <>
          <ToggableCreate />
          {/* <Togglable buttonLabel="create" ref={blogsFormRef}>
            <AddBlog />
          </Togglable> */}
          <RoutesComponent />
        </>
      )}
    </div>
  );
};

export default App;
