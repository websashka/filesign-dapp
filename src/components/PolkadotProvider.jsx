import React, { createContext, useReducer } from 'react';

const initialState = {
  api: null,
  injector: null
};

const store = createContext(initialState);
const { Provider } = store;

// eslint-disable-next-line react/prop-types
const PolkadotProvider = ({ children }) => {
  const [polkadotState, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'setAPI':
        return {
          ...state,
          api: action?.payload,
        };
      case 'setInjector':
        return {
          ...state,
          injector: action?.payload,
        };
      default:
        throw new Error('Action not found');
    }
  }, initialState);

  return (
    <Provider value={{ polkadotState, dispatch }}>
      {children}
    </Provider>
  );
};

export { store, PolkadotProvider };
