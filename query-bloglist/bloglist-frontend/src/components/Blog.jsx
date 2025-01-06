import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
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
  const navigate = useNavigate();

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
      navigate('/blogs');
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
    <div className="max-w-3xl mx-auto bg-gray-100 p-6 rounded shadow mt-6">
      <div className="mb-4">
        <div class="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">
            {blog.title} by {blog.author}{' '}
          </h2>
          {blog.user && username === blog.user.username && (
            <div className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700">
              <button onClick={confirmDelete}>remove</button>
            </div>
          )}
        </div>
        <a
          href="http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html"
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-700 hover:underline"
        >
          <div>{blog.url}</div>
        </a>
        {blog.user && (
          <div>
            added by{' '}
            <Link
              to={`/users/${blog.user.id}`}
              className="text-teal-700 hover:underline"
            >
              {blog.user.name}
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-gray-800">
          {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}{' '}
        </span>
        <button
          onClick={addLike}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          like 👍
        </button>
      </div>

      <Comments blog={blog} />
    </div>
  );
};

export default Blog;

Blog.displayName = 'Blog';
