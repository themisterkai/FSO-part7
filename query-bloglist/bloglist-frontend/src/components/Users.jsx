import { useQuery } from '@tanstack/react-query';
import userService from '../services/users';
import { Link } from 'react-router-dom';

const Users = () => {
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

  return (
    <div className="w-3/4 mx-auto p-4">
      <h1 class="text-2xl font-bold mb-4 text-gray-800">User List</h1>
      <ul role="list" className="divide-y divide-gray-100">
        {users.map(user => (
          <li className="flex justify-between gap-x-6 py-5" key={user.id}>
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <Link
                  to={`/users/${user.id}`}
                  className="text-sm/6 font-semibold text-gray-800 hover:text-teal-600"
                >
                  {user.name}
                </Link>
                <p class="mt-1 truncate text-xs/5 text-gray-500">
                  {user.blogs.length}{' '}
                  {user.blogs.length === 1 ? 'blog' : 'blogs'} created
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
