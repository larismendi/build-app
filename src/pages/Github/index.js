import React from "react";
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from "antd";
import { withRouter } from "react-router";
import Logo from '../../components/Logo';
import Content from '../../components/Github';
import SiderComp from '../../components/Sider';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

import './style.css';

const { Sider } = Layout;

class Github extends React.Component {
  state = {
    collapsed: false,
    openKey: "/github",
    menuKey: window.location.pathname
  };

  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  };

  render() {
    const { collapsed, menuKey, openKey } = this.state;

    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
            <Logo />
            <SiderComp menuKey={menuKey} openKey={openKey} />
          </Sider>
          <Layout className="site-layout">
            <Header />
            <Content />
            <Footer />
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default withRouter(Github);
