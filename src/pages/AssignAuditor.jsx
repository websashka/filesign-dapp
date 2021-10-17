import React, {useContext, useState} from "react";
import {Button, Select, Steps} from "antd";
import usePolkadot from "../hooks/usePolkadot";
import {useAccounts} from "../hooks/useAccounts";
import {FileStore} from "../components/FileProvider";

export const AssignAuditor = () => {
  const { assignAuditor } = usePolkadot()
  const { accounts } = useAccounts();
  const { dispatch, state } = useContext(FileStore);
  const [address, setAddress] = useState();

  return(<>
    <Select
      showSearch
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
      {accounts.map(account => (<Select.Option value={account.address}>{account.meta.name}</Select.Option>))}
    </Select>
  <Button
    onClick={() => {
      assignAuditor(state.id, address);
      dispatch({
        type: "set",
        payload: {
          auditor: address
        }
      })
    }}
  >
    Assign
  </Button>
  </>)
}