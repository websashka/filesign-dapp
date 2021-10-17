import React, {useEffect, useContext, useMemo, useState} from 'react';
import 'antd/dist/antd.css';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { web3FromSource, web3Enable } from '@polkadot/extension-dapp';


import { Layout, Select, Skeleton, Spin} from 'antd';

import { store } from './components/PolkadotProvider';

import types from './types.json';

import styles from "./styles.module.less";
import {useAccounts} from "./hooks/useAccounts";
import {forgetCurrentUser, getCurrentUserAddress, saveCurrentUser} from "./utils/storage";
import {FileProvider} from "./components/FileProvider";
import {Flow, Steps} from "./Flow";
import {SiteBar} from "./components/SiteBar/SiteBar";
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

  const [authVisible, setAuthVisible] = useState(true);

  const [address, setAddress] = useState(getCurrentUserAddress());

  useEffect(() => {
    if(address) {
      setAuthVisible(false);
    }
  }, [address]);

  return (<>
    <Spin spinning={!isAPIReady} tip="Connecting to blockchain node">
      <Layout className={styles.container}>
          <FileProvider>
            <Skeleton loading={!address} active>
              <Flow />
            </Skeleton>
          </FileProvider>
        <Layout.Sider theme="light" collapsible collapsed={!authVisible} width={300} onCollapse={() => {
          setAddress(null);
          setAuthVisible(true);
          forgetCurrentUser();
        }}>
          <SiteBar setAddress={setAddress} address={address} />
        </Layout.Sider>
      </Layout>
    </Spin>
</>
  );
};

App.propTypes = {};

export default App;
