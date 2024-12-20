import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';
import { getAllBlogs } from './blogReducer';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: null,
  reducers: {
    setUser(state, action) {
      const { username, token, name } = action.payload;
      return {
        username,
        token,
        name,
      };
    },
    deleteUser(state, action) {
      return null;
    },
  },
});

export const { setUser, deleteUser } = blogSlice.actions;

export const setUserAndToken = user => {
  return async dispatch => {
    dispatch(setUser(user));
    blogService.setToken(user.token);
    dispatch(getAllBlogs());
  };
};

export const logOff = () => {
  return async dispatch => {
    dispatch(deleteUser());
    window.localStorage.clear();
  };
};

export default blogSlice.reducer;
