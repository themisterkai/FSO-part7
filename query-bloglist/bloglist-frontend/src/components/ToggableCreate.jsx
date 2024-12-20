import { useRef } from 'react';

import AddBlog from './AddBlog';
import Togglable from './Toggable';

const ToggableCreate = () => {
  const blogsFormRef = useRef();

  return (
    <Togglable buttonLabel="create" ref={blogsFormRef}>
      <AddBlog />
    </Togglable>
  );
};

export default ToggableCreate;
