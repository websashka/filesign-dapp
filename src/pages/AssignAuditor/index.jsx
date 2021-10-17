import React, {useContext, useMemo, useState} from "react";
import {Button, Select} from "antd";
import usePolkadot from "../../hooks/usePolkadot";
import {useAccounts} from "../../hooks/useAccounts";
import {FileStore} from "../../components/FileProvider";
import styles from "./styles.module.less";
import {useHistory} from "react-router-dom";

export const AssignAuditor = () => {
  const { assignAuditor } = usePolkadot()
  const { accounts } = useAccounts();
  const { dispatch, state } = useContext(FileStore);
  const [address, setAddress] = useState();
  const history = useHistory();


  const filteredAccounts = useMemo(() =>
    accounts.filter(account =>
      account.address !== state.file?.owner && !state?.file?.auditors?.includes(account.address)),
    [accounts, state.file])



  return(<div className={styles.container}>
    <Select
      className={styles.assignInput}
      showSearch
      value={address}
      style={{ width: 200 }}
      onSelect={(value) => {
        setAddress(value);
      }}
      placeholder="Select a person"
      optionFilterProp="children"
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {filteredAccounts.map(account => (<Select.Option value={account.address}>{account.meta.name}</Select.Option>))}
    </Select>
  <Button
    disabled={!state.file}
    onClick={() => {
      assignAuditor(state.file.id, address).then(() => {
        dispatch({
          type: "set",
          payload: {
            auditors: [...state.file.auditors || [],address]
          }
        });
        setAddress(null);
        if(filteredAccounts.length === 0) {
          history.push("/sign_file");
        }
      });
    }}
  >
    Assign
  </Button>
  </div>)
}