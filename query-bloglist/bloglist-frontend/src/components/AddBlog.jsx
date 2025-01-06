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
      handleClear();
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

  const handleClear = () => {
    setTitle('');
    setAuthor('');
    setURL('');
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="w-2/4 mx-auto p-4">
        <div class="space-y-12">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-base/7 font-semibold text-gray-900">
              Add new blog
            </h2>
            <p class="mt-1 text-sm/6 text-gray-600">
              Share a new blog to others
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  for="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Title
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      type="text"
                      value={title}
                      name="Title"
                      id="title-input"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      onChange={({ target }) => setTitle(target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  for="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Author
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      type="text"
                      value={author}
                      name="Author"
                      id="author-input"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                      onChange={({ target }) => setAuthor(target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  for="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  URL
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      type="text"
                      value={url}
                      name="URL"
                      id="url-input"
                      onChange={({ target }) => setURL(target.value)}
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                className="text-sm/6 font-semibold text-gray-900"
                onClick={handleClear}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-teal-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddBlog;

AddBlog.displayName = 'AddBlog';
