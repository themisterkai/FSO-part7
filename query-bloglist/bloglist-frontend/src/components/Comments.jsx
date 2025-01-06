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

  return (
    <div className="mb-4 mt-10">
      <h3 className="text-xl font-semibold mb-2">comments</h3>
      <div className="flex items-center gap-2 mb-4">
        <span>
          <input
            type="text"
            value={comment}
            name="Title"
            id="title-input"
            className="block min-w-0 w-80 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
            onChange={({ target }) => setComment(target.value)}
          />
        </span>
        <span>
          <button
            onClick={handleComments}
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
          >
            add comment
          </button>
        </span>
      </div>

      <div>
        <ul className="list-disc pl-5 space-y-2">
          {blog.comments &&
            blog.comments.map(c => (
              <li key={c._id} className="text-gray-800">
                {c.comment}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Comments;
