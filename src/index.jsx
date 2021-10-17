import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import App from './App';
import { PolkadotProvider } from './components/PolkadotProvider';

import "./index.css";

render(
  <PolkadotProvider>
    <Router>
      <App />
    </Router>
  </PolkadotProvider>,
  document.getElementById('root'),
);
