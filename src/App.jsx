import React, { useEffect, useContext, useMemo } from 'react';
import 'antd/dist/antd.css';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromSource, web3Enable } from '@polkadot/extension-dapp';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import { Spin } from 'antd';

import { store } from './components/PolkadotProvider';

import types from './types.json';

const wsProvider = new WsProvider('ws://localhost:9944');

wsProvider.on('disconnected', () => {
  console.warn('Provider disconnected. Reconnecting...');
});

wsProvider.on('error', (error) => {
  console.error('Provider error: ', error);
});

const connect = async () => ApiPromise.create({
  provider: wsProvider,
  types
});

const App = () => {
  const { polkadotState, dispatch } = useContext(store);

  const connectAPI = async () => {
    const api = await connect();
    api.on('error', (error) => {
      console.error('API error: ', error);
    });

    dispatch({
      type: 'setAPI',
      payload: api,
    });

    await web3Enable('Evercity dApp');

    let injector;

    setTimeout(async () => {
      injector = await web3FromSource('polkadot-js');

      dispatch({
        type: 'setInjector',
        payload: injector,
      });
    }, 1000);
  };

  useEffect(
    () => {
      connectAPI();
    },
    [dispatch],
  );

  const isAPIReady = useMemo(
    () => polkadotState?.api?.isConnected && polkadotState?.api?.isReady && polkadotState?.injector,
    [polkadotState],
  );

  return (
    <Router>
      <Spin spinning={!isAPIReady} tip="Connecting to blockchain node">
        <Switch>
          <Route exact path="/">
            <Redirect to="/get_file" />
          </Route>
          <Route path="/get_file">
            <div />
          </Route>
          <Route path="/create_file">
            <div />
          </Route>
          <Route path="/assign_auditor">
            <div />
          </Route>
          <Route path="/sign_file">
            <div />
          </Route>
        </Switch>
      </Spin>
    </Router>
  );
};

App.propTypes = {};

export default App;
