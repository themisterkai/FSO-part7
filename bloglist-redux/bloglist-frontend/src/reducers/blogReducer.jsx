import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { displayNotification } from './notificationReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return [...state, action.payload];
    },
    updateBlog(state, action) {
      return state.map(blog =>
        blog.id === action.payload.id ? action.payload : blog
      );
    },
    deleteBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, deleteBlog } =
  blogSlice.actions;

export const getAllBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const addBlog = blogObject => {
  return async dispatch => {
    try {
      const blog = await blogService.create(blogObject);
      dispatch(appendBlog(blog));
      dispatch(
        displayNotification(
          `a new blog ${blogObject.title} by ${blogObject.author} added`
        )
      );
    } catch (e) {
      dispatch(displayNotification(e.response.data.error, true));
    }
  };
};

export const addLike = blogObject => {
  return async dispatch => {
    try {
      const { id, newBlogObj } = blogObject;
      const updatedBlog = await blogService.update(id, {
        ...newBlogObj,
        likes: blogObject.likes + 1,
      });
      dispatch(updateBlog(updatedBlog));
      dispatch(
        displayNotification(
          `1 like for ${blogObject.title} by ${blogObject.author} added`
        )
      );
    } catch (e) {
      dispatch(displayNotification(e.response.data.error, true));
    }
  };
};

export const removeBlog = blogObject => {
  return async dispatch => {
    try {
      await blogService.remove(blogObject.id);
      dispatch(deleteBlog(blogObject.id));
      dispatch(
        displayNotification(
          `${blogObject.title} by ${blogObject.author} removed`
        )
      );
    } catch (e) {
      dispatch(displayNotification(e.response.data.error, true));
    }
  };
};

export default blogSlice.reducer;
