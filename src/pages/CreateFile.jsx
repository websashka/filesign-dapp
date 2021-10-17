import React, {useContext, useEffect, useState} from "react";
import {Button} from "antd";

import {useAccounts} from "../hooks/useAccounts";
import {useHashFiles} from "../hooks/useHashFiles";
import {store} from "../components/PolkadotProvider";
import usePolkadot from "../hooks/usePolkadot";
import {UploadOutlined} from "@ant-design/icons";
import {FileStore} from "../components/FileProvider";
import {Uploader} from "../components/Uploader";
import {getCurrentUserAddress} from "../utils/storage";


export const CreateFile = () => {

  const { ref, hashs, files } = useHashFiles();

  const { createFile, getLastId } = usePolkadot();
  const { polkadotState } = useContext(store);

  const { dispatch } = useContext(FileStore);

  useEffect(() => {
    if(hashs[0] && polkadotState.api) {
      getLastId().then((id) => {
        createFile(id,hashs[0]).then(() => {
          dispatch({
            type: "set",
            payload: { id, hash: hashs[0], owner: getCurrentUserAddress() }
          });
        });
      });
    }
  }, [polkadotState, hashs]);

  useEffect(() => {
    if(files.length > 0) {
      dispatch({
        type: "set",
        payload: { file: files[0] }
      });
    }
  }, [files])

  return(<div style={{display: "flex", justifyContent: "center", marginLeft: "350px", marginTop: "50px"}}>
    <Uploader ref={ref}/>
  </div>);
};