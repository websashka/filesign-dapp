import React, {useState} from "react";
import {Button, Card, Input, List} from "antd";
import usePolkadot from "../hooks/usePolkadot";
import {CheckOutlined} from "@ant-design/icons";


export const GetFile = () => {
  const { getFile } = usePolkadot();
  const [file, setFile] = useState();
  const onSearch = (id) => {
    getFile(id).then(file => {
      setFile(file);
      console.log(file)
    });
  }


  return(<>
    <Input.Search
      onSearch={onSearch}
    />
    {file && (<Card
      title={file.id}
    >
      Owner: {file.owner}
      <ul>
        Auditors: {file.auditors.map(auditor => <li>{auditor}</li>)}
      </ul>
      <ul>
        Versions: {file.versions?.map(version => (<li>
          <p>tag - {version.tag}</p>
          <p>filehash - {version.filehash}</p>
          <p>signatures
            <ol>
              {version.signatures.map(signature => (<li>{signature.address} {signature.signed && <CheckOutlined />}</li>))}
            </ol>
          </p>
        </li>))}
      </ul>
    </Card>)}
  </>)
}