import React, {useContext} from "react";
import {Button, Typography} from "antd";
import usePolkadot from "../../hooks/usePolkadot";
import {FileStore} from "../../components/FileProvider";
import styles from "./styles.module.less";
import {getCurrentUserAddress} from "../../utils/storage";

export const SignFile = () => {
  const { signFile } = usePolkadot();
  const { state } = useContext(FileStore);
  const currentAddress = getCurrentUserAddress();
  return(<div className={styles.container}>

    Current account: <Typography.Text keyboard className={styles.address}>{currentAddress}</Typography.Text>
    <Button
      onClick={() => signFile(state.file.id).then(() => {

      })}
    >Sign File</Button>
  </div>);
};