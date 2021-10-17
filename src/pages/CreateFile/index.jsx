import React, {useContext, useEffect, useState} from "react";
import {useHashFiles} from "../../hooks/useHashFiles";
import {store} from "../../components/PolkadotProvider";
import usePolkadot from "../../hooks/usePolkadot";
import {FileStore} from "../../components/FileProvider";
import {Uploader} from "../../components/Uploader";
import {getCurrentUserAddress} from "../../utils/storage";
import {useHistory} from "react-router-dom";


export const CreateFile = () => {

  const { ref, hashs, files } = useHashFiles();

  const { createFile, getLastId } = usePolkadot();
  const { polkadotState } = useContext(store);

  const { dispatch } = useContext(FileStore);
  const history = useHistory();

  useEffect(() => {
    if(hashs[0] && polkadotState.api) {
      getLastId().then((id) => {
        createFile(id,hashs[0]).then(() => {
          dispatch({
            type: "set",
            payload: { id, hash: hashs[0], owner: getCurrentUserAddress() }
          });
        });
      }).then(() => {
        history.push("/assign_auditor");
      });
    }
  }, [polkadotState, hashs]);

  useEffect(() => {
    if(files.length > 0) {
      dispatch({
        type: "set",
        payload: { name: files[0].name }
      });
    }
  }, [files])

  return(<div style={{display: "flex", justifyContent: "center", marginLeft: "350px", marginTop: "50px"}}>
    <Uploader ref={ref}/>
  </div>);
};