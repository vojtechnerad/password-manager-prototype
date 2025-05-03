import { Layout, ConfigProvider, theme } from "antd";
import "./App.css";
import { Content, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { useState } from "react";
import PasswordsList from "./components/PasswordsList";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);

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
            Toolbar
          </Header>
          <Layout>
            <Sider width={200}>Sider</Sider>
            <Content
              style={{ background: "#fff", overflow: "hidden" }}
            >
              <PasswordsList />
            </Content>
          </Layout>
        </Layout>
      </ConfigProvider>
    </>
  );
}

export default App;
