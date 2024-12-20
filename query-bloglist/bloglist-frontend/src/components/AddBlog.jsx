import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  displayNotification,
  displayNotificationError,
  useNotificationDispatch,
} from '../NotificationContext';
import blogService from '../services/blogs';

const AddBlog = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: blog => {
      notificationDispatch(
        displayNotification(`a new blog ${blog.title} by ${blog.author} added`)
      );
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(['blogs'], [...blogs, blog]);
    },
    onError: error => {
      notificationDispatch(
        displayNotificationError(
          error.response != null ? error.response.data.error : error.message
        )
      );
    },
  });

  const handleSubmit = event => {
    event.preventDefault();
    newBlogMutation.mutate({ title, author, url });
  };
  return (
    <>
      <h2>add new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            id="title-input"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            id="author-input"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="URL"
            id="url-input"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit" id="submit-blog-button">
          create
        </button>
      </form>
    </>
  );
};

export default AddBlog;

AddBlog.displayName = 'AddBlog';
