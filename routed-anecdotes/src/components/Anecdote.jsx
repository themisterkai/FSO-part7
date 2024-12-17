import PropTypes from 'prop-types';

const Anecdote = ({ anecdote }) => {
  return <h2>{anecdote.content}</h2>;
};

export default Anecdote;

Anecdote.propTypes = {
  anecdote: PropTypes.object,
};
