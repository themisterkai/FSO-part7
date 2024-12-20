import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import blogService from '../services/blogs';
import {
  displayNotification,
  displayNotificationError,
  useNotificationDispatch,
} from '../NotificationContext';

const Blog = ({ blog, handleRemove, username }) => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

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

  const addLike = () => {
    const { user, ...blogObject } = blog;
    likeBlogMutation.mutate({ ...blogObject, likes: blogObject.likes + 1 });
  };

  const confirmDelete = () => {
    const userConfirmed = confirm(
      `Are you sure you want to delete ${blog.title} by ${blog.author}?`
    );
    if (userConfirmed) {
      deleteBlogMutation.mutate(blog);
    }
  };

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: blog => {
      notificationDispatch(
        displayNotification(`1 like for ${blog.title} by ${blog.author} added`)
      );
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.map(b => (b.id === blog.id ? blog : b))
      );
    },
    onError: error => {
      notificationDispatch(
        displayNotificationError(
          error.response != null ? error.response.data.error : error.message
        )
      );
    },
  });

  const deleteBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (response, removedBlog) => {
      notificationDispatch(
        displayNotification(
          `${removedBlog.title} by ${removedBlog.author} removed`
        )
      );
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.filter(blog => blog.id !== removedBlog.id)
      );
    },
    onError: error => {
      notificationDispatch(
        displayNotificationError(
          error.response != null ? error.response.data.error : error.message
        )
      );
    },
  });

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
            {blog.likes} <button onClick={addLike}>like</button>
          </div>
          {blog.user && <div>{blog.user.name}</div>}
          {/* {username === blog.username && ( */}
          <div>
            <button onClick={confirmDelete}>remove</button>
          </div>
          {/* )} */}
        </>
      )}
    </div>
  );
};

export default Blog;

Blog.displayName = 'Blog';
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  // handleLikes: PropTypes.func.isRequired,
  // handleRemove: PropTypes.func.isRequired,
};
