import { useState } from 'react';

import blogService from '../services/blogs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  displayNotification,
  displayNotificationError,
  useNotificationDispatch,
} from '../NotificationContext';

const Comments = ({ blog }) => {
  const [comment, setComment] = useState('');
  const notificationDispatch = useNotificationDispatch();
  const queryClient = useQueryClient();

  const newBlogCommentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: updatedBlog => {
      notificationDispatch(
        displayNotification(`a new blog comment added to ${updatedBlog.title}`)
      );
      const blogs = queryClient.getQueryData(['blogs']);
      queryClient.setQueryData(
        ['blogs'],
        blogs.map(b => (b.id === updatedBlog.id ? updatedBlog : b))
      );
      setComment('');
    },
    onError: error => {
      notificationDispatch(
        displayNotificationError(
          error.response != null ? error.response.data.error : error.message
        )
      );
    },
  });

  const handleComments = e => {
    e.preventDefault();
    newBlogCommentMutation.mutate({ blogId: blog.id, comment });
  };
  //
  return (
    <div>
      <h3>comments</h3>
      <span>
        <input
          type="text"
          value={comment}
          name="Title"
          id="title-input"
          onChange={({ target }) => setComment(target.value)}
        />
      </span>
      <span>
        <button onClick={handleComments}>add comment</button>
      </span>
      <div>
        <ul>
          {blog.comments &&
            blog.comments.map(c => <li key={c.id}>{c.comment}</li>)}
        </ul>
      </div>
    </div>
  );
};

export default Comments;
