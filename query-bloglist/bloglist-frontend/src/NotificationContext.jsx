import { createContext, useReducer, useContext } from 'react';

const initialState = {
  message: '',
  isError: false,
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'DISPLAY': {
      const { message } = action;
      return { message };
    }
    case 'DISPLAY_ERROR': {
      const { message } = action;
      return { message, isError: true };
    }
    case 'HIDE':
      return initialState;
    default:
      return initialState;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = props => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  );

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[0];
};

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);
  return notificationAndDispatch[1];
};

export const displayNotification = message => {
  return {
    type: 'DISPLAY',
    message,
  };
};

export const displayNotificationError = message => {
  return {
    type: 'DISPLAY_ERROR',
    message,
  };
};

export default NotificationContext;
