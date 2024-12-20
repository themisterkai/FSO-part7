import { Routes, Route, Link, useMatch } from 'react-router-dom';

import BlogList from './BlogList';
import Users from './Users';
import User from './User';

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<BlogList />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/:id" element={<User />} />
    </Routes>
  );
};

export default RoutesComponent;
