import { useContext, useReducer } from 'react';
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

export const useStore = () => useContext(UserContext)[0];
export const useDispatch = () => useContext(UserContext)[1];
