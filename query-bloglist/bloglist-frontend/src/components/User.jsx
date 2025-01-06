import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

import userService from '../services/users';

const User = () => {
  const { id } = useParams();
  const result = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    retry: 1,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>user service is not available due to problems in server</div>;
  }

  const users = result.data;
  const user = users.find(u => u.id === id);
  if (!user) {
    return <div>user not found</div>;
  }
  return (
    <div className="max-w-3xl mx-auto bg-gray-100 p-6 rounded shadow mt-6">
      <div className="mb-4">
        <h2 className="text-2xl font-bold">{user.name}</h2>
      </div>
      <div className="mb-4 mt-10">
        <h3 className="text-xl font-semibold mb-2">added blogs</h3>
        <ul className="list-disc pl-5 space-y-2">
          {user.blogs.map(blog => (
            <li key={blog.id}>
              <Link
                to={`/blogs/${blog.id}`}
                className="text-teal-700 hover:underline"
              >
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default User;
