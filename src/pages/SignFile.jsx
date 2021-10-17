import React, {useContext} from "react";
import {Button} from "antd";
import usePolkadot from "../hooks/usePolkadot";
import {FileStore} from "../components/FileProvider";

export const SignFile = () => {
  const { signFile } = usePolkadot();
  const { state } = useContext(FileStore);

  return(<>
    <Button
      onClick={() => signFile(state.id).then(() => {

      })}
    >Sign File</Button>
  </>)
};