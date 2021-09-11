import React from 'react';
import { render } from 'react-dom';

import App from './App';
import { PolkadotProvider } from './components/PolkadotProvider';

render(
  <PolkadotProvider>
    <App />
  </PolkadotProvider>,
  document.getElementById('root'),
);
