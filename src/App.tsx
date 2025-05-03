import { Layout, ConfigProvider, theme } from "antd";
import "./App.css";
import { Content, Header } from "antd/es/layout/layout";
import SiderLayout from "antd/es/layout/Sider";
import { useState } from "react";
import PasswordsList from "./components/PasswordsList";
import Toolbar from "./components/Toolbar";
import Sider from "./components/Sider";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <>
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        }}
      >
        <Layout style={{ minHeight: "100vh" }}>
          <Header
            style={{
              height: 60,
              padding: "0 16px",
            }}
          >
            <Toolbar />
          </Header>
          <Layout>
            <SiderLayout width={200}>
              <Sider />
            </SiderLayout>
            <Content style={{ overflow: "hidden" }}>
              <PasswordsList />
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default App;
