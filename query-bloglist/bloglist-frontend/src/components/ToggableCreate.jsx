import { useRef } from 'react';
import { useLocation } from 'react-router-dom';

import AddBlog from './AddBlog';
import Togglable from './Toggable';

const ToggableCreate = () => {
  const blogsFormRef = useRef();

  // Only render CreateBlog if the current path is '/'
  // if (location.pathname !== '/' && location.pathname !== '/blogs') {
  //   return null; // You can return null or any other component you'd like for other paths
  // }

  return (
    <Togglable buttonLabel="create" ref={blogsFormRef}>
      <AddBlog />
    </Togglable>
  );
};

export default ToggableCreate;
