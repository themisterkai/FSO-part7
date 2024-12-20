import { useQuery } from '@tanstack/react-query';
import Blog from './Blog';
import blogService from '../services/blogs';

const BlogList = () => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    retry: 1,
  });
  console.log(JSON.parse(JSON.stringify(result)));

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>note service is not available due to problems in server</div>;
  }

  const blogs = result.data;
  return (
    <>
      {blogs.map(blog => (
        <Blog blog={blog} key={blog.id} />
      ))}
    </>
  );
};
export default BlogList;
