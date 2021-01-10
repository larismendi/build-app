import React, { useContext } from "react";
import {
  Link
} from 'react-router-dom';
import { Menu } from "antd";
import {
  CalendarOutlined,
  GithubOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { AuthGlobal } from "../../contexts/stores/Auth";
import { logoutUser } from "../../contexts/actions/authentication.action";

const { SubMenu } = Menu;

export default function Sider(props) {
  const context = useContext(AuthGlobal);
  const closeSesion = () => {
    logoutUser(context.dispatch);
  };

  return (
    <Menu 
      theme="dark" 
      defaultOpenKeys={[props["openKey"] ?? ""]} 
      defaultSelectedKeys={[props["menuKey"] ?? "profile"]} 
      mode="inline"
    >
      <Menu.Item key="/profile" icon={<UserOutlined />}>
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <SubMenu key="/github" icon={<GithubOutlined />} title="Github">
        <Menu.Item key="/github">
          <Link to="/github">Repositorios</Link>
        </Menu.Item>
        <Menu.Item key="/github/favorites">
          <Link to="/github/favorites">Repos Favoritos</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="/calendar" icon={<CalendarOutlined />}>
        <Link to="/calendar">Calendar</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<LogoutOutlined />} onClick={closeSesion}>
        Logout
      </Menu.Item>
    </Menu>
  );
}
