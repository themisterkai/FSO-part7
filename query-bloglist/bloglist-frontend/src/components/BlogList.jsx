import { useQuery } from '@tanstack/react-query';
import Blog from './Blog';
import blogService from '../services/blogs';
import { Link } from 'react-router-dom';

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
      <h2>blogs</h2>
      {blogs.map(blog => (
        <div style={blogStyle} key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      ))}
    </>
  );
};
export default BlogList;
