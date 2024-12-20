import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import Login from './components/Login';
import AddBlog from './components/AddBlog';
import Notification from './components/Notification';
import blogService from './services/blogs';
import loginServices from './services/login';
import Togglable from './components/Toggable';
import {
  displayNotification,
  displayNotificationError,
  useNotificationDispatch,
} from './NotificationContext';
import BlogList from './components/BlogList';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const notificationDispatch = useNotificationDispatch();

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const userFromLS = JSON.parse(loggedInUser);
      setUser(userFromLS);
      blogService.setToken(userFromLS.token);
    }
  }, []);

  const blogsFormRef = useRef();

  const handleLogin = async event => {
    event.preventDefault();

    try {
      const userFromLogin = await loginServices.login({
        username,
        password,
      });
      setUser(userFromLogin);
      window.localStorage.setItem(
        'loggedInUser',
        JSON.stringify(userFromLogin)
      );
      blogService.setToken(userFromLogin.token);
      setUsername('');
      setPassword('');
      notificationDispatch(
        displayNotification(`${userFromLogin.name} successfully logged in`)
      );
    } catch (e) {
      notificationDispatch(displayNotificationError(e.response.data.error));
    }
  };

  const handleAdd = async blogObject => {
    try {
      const newBlog = await blogService.create(blogObject);
      blogsFormRef.current.toggleVisibility();
      // setBlogs([...blogs, newBlog]);
      notificationDispatch(
        displayNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
      );
    } catch (e) {
      notificationDispatch(displayNotificationError(e.response.data.error));
    }
  };

  const handleLikes = async (id, blogObject) => {
    try {
      const updatedBlog = await blogService.update(id, blogObject);
      // setBlogs(
      //   sortBlog(blogs.map(blog => (blog.id === id ? updatedBlog : blog)))
      // );
      notificationDispatch(
        displayNotification(
          `1 like for ${blogObject.title} by ${blogObject.author} added`
        )
      );
    } catch (e) {
      notificationDispatch(displayNotificationError(e.response.data.error));
    }
  };

  const handleRemove = async blogObject => {
    try {
      await blogService.remove(blogObject.id);
      // setBlogs(sortBlog(blogs.filter(blog => blog.id !== blogObject.id)));
      notificationDispatch(
        displayNotification(
          `${blogObject.title} by ${blogObject.author} removed`
        )
      );
    } catch (e) {
      notificationDispatch(displayNotificationError(e.response.data.error));
    }
  };

  const handleLogout = async event => {
    event.preventDefault();
    notificationDispatch(
      displayNotification(`${user.name} logged out successfully`)
    );
    setUser(null);
    window.localStorage.clear();
  };

  return (
    <div>
      <Notification />
      {user == null && (
        <Login
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      )}
      {user != null && (
        <div>
          <div>{user.name} logged in</div>
          <button onClick={handleLogout}>logout</button>
          <Togglable buttonLabel="create" ref={blogsFormRef}>
            <AddBlog handleAdd={handleAdd} />
          </Togglable>
          <h2>blogs</h2>
          <BlogList />
        </div>
      )}
    </div>
  );
};

export default App;
