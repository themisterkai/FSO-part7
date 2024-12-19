import { createSlice } from '@reduxjs/toolkit';

const initialState = { text: '', isError: false };

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification(state, action) {
      console.log('payload:', action.payload);
      return action.payload;
    },
    hideNotification(state, action) {
      return initialState;
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;

export const displayNotification = (text, isError = false) => {
  return async dispatch => {
    dispatch(showNotification({ text, isError }));
    const timer = setTimeout(() => {
      dispatch(hideNotification());
    }, 5000);
    return () => clearTimeout(timer);
  };
};

export default notificationSlice.reducer;
