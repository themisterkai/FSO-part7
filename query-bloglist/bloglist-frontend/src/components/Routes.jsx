import { Routes, Route } from 'react-router-dom';

import BlogList from './BlogList';
import Users from './Users';
import User from './User';
import Blog from './Blog';
import AddBlog from './AddBlog';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/create" element={<AddBlog />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<User />} />
      <Route path="/blogs" element={<BlogList />} />
      <Route path="/blogs/:id" element={<Blog />} />
    </Routes>
  );
};

export default RoutesComponent;
