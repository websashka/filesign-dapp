import React, {useContext} from "react";
import {Button, Descriptions, Layout, Steps} from "antd";
import styles from "./styles.module.less";
import {Redirect, Route, Switch, useHistory, useLocation} from "react-router-dom";
import {CreateFile} from "./pages/CreateFile";
import {AssignAuditor} from "./pages/AssignAuditor";
import {SignFile} from "./pages/SignFile";
import {GetFile} from "./pages/GetFile";
import {useMemo} from "react";
import {FileStore} from "./components/FileProvider";
import {log} from "@craco/craco/lib/logger";


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
  const { state, dispatch } = useContext(FileStore);

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
          title="Assign Auditor"
        />
        <Steps.Step
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
      <Descriptions bordered   extra={<Button disabled={!state.id} type="primary" onClick={() => {
        dispatch({
          type: "clear"
        });
      }}>Abort</Button>}>
        <Descriptions.Item label="File Name" span={2}>{state?.file?.name}</Descriptions.Item>
        <Descriptions.Item label="Auditor" span={2}>{state?.auditor}</Descriptions.Item>
        <Descriptions.Item label="Owner" span={2}>{state?.owner}</Descriptions.Item>
        <Descriptions.Item span={2} label="File Hash">{state?.hash}</Descriptions.Item>
        <Descriptions.Item span={2} label="ID">{state?.id}</Descriptions.Item>
        <Descriptions.Item span={2} label="Status"></Descriptions.Item>
      </Descriptions>
    </Layout.Footer>
  </Layout>)
}