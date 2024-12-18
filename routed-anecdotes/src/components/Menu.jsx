import { Routes, Route, Link, useMatch } from 'react-router-dom';
import CreateNew from './CreateNew';
import AnecdoteList from './AnecdoteList';
import About from './About';
import Anecdote from './Anecdote';
import PropTypes from 'prop-types';
import Notification from './Notification';

const Menu = ({ anecdotes, addNew, notification, setNotification }) => {
  const padding = {
    paddingRight: 5,
  };

  const match = useMatch('/anecdotes/:id');
  const anecdote = match
    ? anecdotes.find(a => a.id === Number(match.params.id))
    : null;
  return (
    <div>
      <div>
        <Link style={padding} to="/">
          anecdotes
        </Link>
        <Link style={padding} to="/create">
          create new
        </Link>
        <Link style={padding} to="/about">
          about
        </Link>
      </div>
      <div>
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      </div>

      <Routes>
        <Route path="/about" element={<About />} />
        <Route
          path="/create"
          element={
            <CreateNew addNew={addNew} setNotification={setNotification} />
          }
        />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route
          path="/anecdotes/:id"
          element={<Anecdote anecdote={anecdote} />}
        />
      </Routes>

      <div>
        <i>Note app, Department of Computer Science 2024</i>
      </div>
    </div>
  );
};

export default Menu;

Menu.propTypes = {
  anecdotes: PropTypes.arrayOf(PropTypes.object).isRequired,
  addNew: PropTypes.func,
  notification: PropTypes.string.isRequired,
  setNotification: PropTypes.func.isRequired,
};
