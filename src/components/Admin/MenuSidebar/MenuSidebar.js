import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Menu } from "antd";
import { UsergroupDeleteOutlined, HomeOutlined } from "@ant-design/icons";

import "./MenuSidebar.scss";


 function MenuSidebar(props) {
  const {menuCollapse} = props;
  const { Sider } = Layout;
  return (
    <Sider className="admin-sidebar" collapsed={menuCollapse}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to={"/admin"} className="center">
            <HomeOutlined />
            <span className="nav-text">Inicio</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to={"/admin/usuarios"} className="center">
          <UsergroupDeleteOutlined />
            <span className="nav-text">Usuarios</span>
          </Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
}
export default withRouter(MenuSidebar);