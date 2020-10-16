import React from "react";
import "./MenuTop.scss";
import { Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import logoFacci from "../../../assets/img/png/logoFaci.png";
import { logout } from "../../../api/auth";
export default function MenuTop(props) {
  const { menuCollapse, setMenuCollapse } = props;
  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img className="menu-top__left-logo" src={logoFacci} alt="facci" />
        <Button type="link" onClick={() => setMenuCollapse(!menuCollapse)}>
          {menuCollapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <div className="menu-top__right">
        <Button type="link" onClick={logoutUser}>
          <PoweroffOutlined />
        </Button>
      </div>
    </div>
  );
}
