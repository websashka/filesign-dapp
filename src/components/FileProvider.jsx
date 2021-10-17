import React, { createContext, useReducer } from 'react';

const initialState = {

};

const FileStore = createContext(initialState);
const { Provider } = FileStore;

// eslint-disable-next-line react/prop-types
const FileProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'set':
        return {
          ...state,
          ...action.payload
        };
      case 'clear':
        return {
          ...initialState
        };
      default:
        throw new Error('Action not found');
    }
  }, initialState);

  return (
    <Provider value={{ state, dispatch }}>
      {children}
    </Provider>
  );
};

export { FileStore, FileProvider };
