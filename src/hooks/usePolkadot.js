import {
  useCallback,
  useContext,
} from 'react';

import { notification } from 'antd';

import { store } from '../components/PolkadotProvider';

import { getCurrentUserAddress } from '../utils/storage';

export default () => {
  const { polkadotState } = useContext(store);
  const { api, injector } = polkadotState;


  const getFile = useCallback(
    async (id) => {
      const result = await api.query.audit.fileByID(id);

      return result?.toJSON();
    },
    [api],
  );

  const createFile = useCallback(
    async (tag, filehash) => {
      const currentUserAddress = getCurrentUserAddress();

      try {
        await api
          .tx
          .audit
          .createNewFile(tag, filehash)
          .signAndSend(
            currentUserAddress,
            {
              signer: injector.signer,
              nonce: -1,
            },
            () => {},
          );

        notification.success({
          message: 'File created',
          description: 'Transaction has been sent to blockchain',
        });
      } catch (error) {
        notification.error({
          message: 'Signing/sending transaction process failed',
          description: error,
        });
      }
    },
    [
      api,
      injector,
    ],
  );

  return {
    getFile,
    createFile,
  };
};
