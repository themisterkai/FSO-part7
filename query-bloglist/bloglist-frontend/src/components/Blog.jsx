import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import blogService from '../services/blogs';
import {
  displayNotification,
  displayNotificationError,
  useNotificationDispatch,
} from '../NotificationContext';
import { useUserValue } from '../UserContext';
import Comments from './Comments';

const Blog = () => {
  const { id } = useParams();
  const { username } = useUserValue();
  const queryClient = useQueryClient();
  const notificationDispatch = useNotificationDispatch();

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  });
  console.log(JSON.parse(JSON.stringify(result)));

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

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>blog service is not available due to problems in server</div>;
  }

  const blogs = result.data;
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return <div>blog not found</div>;
  }

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

  return (
    <div className="blog">
      <div>
        <h2>
          {blog.title} by {blog.author}{' '}
        </h2>
      </div>
      <div>{blog.url}</div>
      <div>
        {blog.likes} likes <button onClick={addLike}>like</button>
      </div>
      {blog.user && (
        <div>
          added by <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
        </div>
      )}
      {blog.user && username === blog.user.username && (
        <div>
          <button onClick={confirmDelete}>remove</button>
        </div>
      )}
      <Comments blog={blog} />
    </div>
  );
};

export default Blog;

Blog.displayName = 'Blog';
