import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { addLike, removeBlog } from '../reducers/blogReducer';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.user).username;
  const [isVisible, setIsVisible] = useState(false);
  const handleSetIsVisible = event => {
    event.preventDefault();
    setIsVisible(!isVisible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const handleLike = () => {
    dispatch(addLike(blog));
  };

  const confirmDelete = () => {
    const userConfirmed = confirm(
      `Are you sure you want to delete ${blog.title} by ${blog.author}?`
    );
    if (userConfirmed) {
      dispatch(removeBlog(blog));
    }
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={handleSetIsVisible}>
          {isVisible ? 'hide' : 'view'}
        </button>
      </div>
      {isVisible && (
        <>
          <div>{blog.url}</div>
          <div>
            {blog.likes} <button onClick={handleLike}>like</button>
          </div>
          {blog.user && username === blog.user.username && (
            <div>
              <button onClick={confirmDelete}>remove</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Blog;

Blog.displayName = 'Blog';
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
