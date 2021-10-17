import React, {useContext} from "react";
import {Button, Descriptions, Dropdown, Layout, Menu, Steps} from "antd";
import styles from "./styles.module.less";
import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import {CreateFile} from "./pages/CreateFile";
import { AssignAuditor } from "./pages/AssignAuditor";
import {SignFile} from "./pages/SignFile";
import {GetFile} from "./pages/GetFile";
import {useMemo} from "react";
import {FileStore} from "./components/FileProvider";
import {Status} from "./components/Status";
import {DownOutlined} from "@ant-design/icons";
import {getCurrentUserAddress} from "./utils/storage";

const flow = [
  '/create_file',
  '/assign_auditor',
  '/sign_file',
  '/get_file'
];


export const Flow = () => {
  const { pathname } = useLocation();
  const history = useHistory();
  const currentStep = useMemo(() => flow.indexOf(pathname), [pathname]);
  const { state: { file }, dispatch } = useContext(FileStore);

  const statusFile = useMemo(() => {
    return ''
  }, [file]);

  const auditors =  (<Menu>
    {file?.auditors?.slice(1).map(auditor => (<Menu.Item>{auditor}</Menu.Item>))}
  </Menu>)


  return(<Layout className={styles.main}>
    <Layout.Header className={styles.header}>
      <Steps
        type="navigation"
        size="small"
        onChange={(step) => {
          history.push(flow[step])
        }}
        current={currentStep}
      >
        <Steps.Step
          title="Create File"
        />
        <Steps.Step
          disabled={!file}
          title="Assign Auditor"
        />
        <Steps.Step
          disabled={!file?.auditors?.length}
          title="Sign File"
        />
        <Steps.Step
          title="Find File"
        />
      </Steps>
    </Layout.Header>

    <Layout.Content>
      <Switch>
        <Route exact path="/">
          <Redirect to="/get_file" />
        </Route>
        <Route path="/create_file" component={CreateFile}/>
        <Route path="/assign_auditor" component={AssignAuditor} />
        <Route path="/sign_file" component={SignFile} />
        <Route path="/get_file"  component={GetFile}/>
      </Switch>
    </Layout.Content>

    <Layout.Footer className={styles.footer}>
      <Descriptions bordered   extra={<Button disabled={!file || file.owner !== getCurrentUserAddress()} type="primary" onClick={() => {
        dispatch({
          type: "clear"
        });
        history.push("/create_file");
      }}>Abort</Button>}>
        <Descriptions.Item label="File Name" span={2}>{file?.name}</Descriptions.Item>
        <Descriptions.Item label="Auditors" span={2}>
          {file?.auditors?.length > 1 ? (<Dropdown overlay={auditors}>
            <div><DownOutlined />{file.auditors[0]}</div>
          </Dropdown>): file?.auditors?.length && file?.auditors[0]}
        </Descriptions.Item>
        <Descriptions.Item label="Owner" span={2}>{file?.owner}</Descriptions.Item>
        <Descriptions.Item span={2} label="File Hash">{file?.hash}</Descriptions.Item>
        <Descriptions.Item span={2} label="ID">{file?.id}</Descriptions.Item>
        <Descriptions.Item span={2} label="Status">
          {file && (<Status status={statusFile} />)}
        </Descriptions.Item>
      </Descriptions>
    </Layout.Footer>
  </Layout>)
}