import { useReducer } from 'react';
import { UserContext } from './UserContext';
import { initialStore, userReducer } from './userReducer';

export const UserProvider = ({ children }) => {
  const [store, dispatch] = useReducer(userReducer, initialStore);
  return (
    <UserContext.Provider value={[store, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
