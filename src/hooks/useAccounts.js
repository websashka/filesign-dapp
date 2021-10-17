import {useContext, useEffect, useState} from "react";
import {web3Accounts} from "@polkadot/extension-dapp";
import {store} from "../components/PolkadotProvider";

export const useAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const { polkadotState } = useContext(store);


  useEffect(() => {
    if(polkadotState.api) {
      web3Accounts().then(all => {
        setAccounts(all);
      });
    }
  }, [polkadotState]);

  return ({accounts});
};