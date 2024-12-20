import { createContext, useReducer, useContext } from 'react';
import blogService from './services/blogs';

const userReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      const { username, token, name } = action.user;
      return { username, token, name };
    }
    case 'LOGOFF':
      return null;
    default:
      return null;
  }
};

const UserContext = createContext();

export const UserContextProvider = props => {
  const [user, userDispatch] = useReducer(userReducer, null);

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[0];
};

export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext);
  return userAndDispatch[1];
};

export const userLogin = user => {
  window.localStorage.setItem('loggedInUser', JSON.stringify(user));
  blogService.setToken(user.token);
  return {
    type: 'LOGIN',
    user,
  };
};

export const userLogoff = () => {
  window.localStorage.clear();
  return {
    type: 'LOGOFF',
  };
};

export default UserContext;
