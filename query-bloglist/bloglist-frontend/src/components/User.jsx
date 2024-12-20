import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

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
    <>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => (
          <div>
            <li key={blog.id}>{blog.title}</li>
          </div>
        ))}
      </ul>
    </>
  );
};
export default User;
