import { useQuery } from '@tanstack/react-query';
import blogService from '../services/blogs';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
    select: data => data.sort((a, b) => b.likes - a.likes),
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>blog service is not available due to problems in server</div>;
  }

  const blogs = result.data;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <>
      <div className="w-3/4 mx-auto p-4">
        <div class="flex justify-between items-center mb-4">
          <h1 class="text-2xl font-bold mb-4 text-gray-800">Blog List</h1>
          <Link
            className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
            to={`/create`}
          >
            Create
          </Link>
        </div>
        <ul role="list" className="divide-y divide-gray-100">
          {blogs.map(blog => (
            <li className="flex justify-between gap-x-6 py-5" key={blog.id}>
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <Link
                    to={`/blogs/${blog.id}`}
                    className="text-sm/6 font-semibold text-gray-800 hover:text-teal-600"
                  >
                    {blog.title}
                  </Link>
                  <p class="mt-1 truncate text-xs/5 text-gray-500">
                    {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default BlogList;
