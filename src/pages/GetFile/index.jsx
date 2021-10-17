import React, {useState} from "react";
import { Card, Input, Typography } from "antd";
import usePolkadot from "../../hooks/usePolkadot";
import {CheckOutlined} from "@ant-design/icons";

import styles from "./styles.module.less";

export const GetFile = () => {
  const { getFile } = usePolkadot();
  const [file, setFile] = useState();
  const onSearch = (id) => {
    getFile(id).then(file => {
      setFile(file);
    });
  }

  return(<div className={styles.container}>
    <Input.Search
      placeholder="Input file ID"
      className={styles.search}
      onSearch={onSearch}
    />
    {file && (<Card
      title={file.id}
    >
      <Typography.Text strong>Owner:</Typography.Text> {file.owner}
      <ul>
        <Typography.Text strong>Auditors:</Typography.Text> {file.auditors.map(auditor => <li><Typography.Text mark>{auditor}</Typography.Text></li>)}
      </ul>
      <ul>
        <Typography.Text strong>Versions:</Typography.Text> {file.versions?.map(version => (<li>
          <Typography.Paragraph>tag - {version.tag}</Typography.Paragraph>
          <Typography.Paragraph>filehash - {version.filehash}</Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Text strong>Signatures</Typography.Text>
            <ol>
              {version.signatures.map(signature =>
                (<li><Typography.Text>{signature.address} {signature.signed && <CheckOutlined style={{color: "green"}}/>}</Typography.Text></li>))}
            </ol>
          </Typography.Paragraph>
        </li>))}
      </ul>
    </Card>)}
  </div>)
}