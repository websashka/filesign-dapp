import React from "react";
import { Select, Typography } from "antd";
import {saveCurrentUser} from "../../utils/storage";
import {useAccounts} from "../../hooks/useAccounts";
import styles from "./styles.module.less";
export const SiteBar = ({address, setAddress}) => {

  const { accounts } = useAccounts();


  return(!address && <div className={styles.container}>

    <Typography.Title italic className={styles.title} level={3}>Polkadot FileSign dApp </Typography.Title>
    <Typography className={styles.description}>For continue</Typography>
    <Select
      showSearch
      value={address}
      style={{ width: 200 }}
      onSelect={(address) => {
        setAddress(address);
        saveCurrentUser(address);
      }}
      placeholder="Select a address"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {accounts.map(account => (<Select.Option value={account.address}>{account.meta.name}</Select.Option>))}
    </Select>
  </div>);
}