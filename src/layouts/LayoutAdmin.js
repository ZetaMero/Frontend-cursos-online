import React, { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Layout } from "antd";
import useAuth from '../hooks/useAuth';
import SingInSignOut from "../pages/Admin/SignInSingOut/SignInSingOut";
import MenuSidebar from "../components/Admin/MenuSidebar";
import MenuTop from "../components/Admin/MenuTop/MenuTop";
import "./LayoutAdmin.scss";
export const LayoutAdmin = (props) => {
  const { routes } = props;
  const [menuCollapse, setMenuCollapse] = useState(false);
  const { Header, Content, Footer } = Layout;
  const {user, isLoading} = useAuth();
  
  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={SingInSignOut} />
        <Redirect to="/admin/login" />
      </>
    );
  }
  if(user && !isLoading){
return (
    <Layout>
      <MenuSidebar menuCollapse={menuCollapse} />
      <Layout
        className="layout-admin"
        style={{ marginLeft: menuCollapse ? "80px" : "200px" }}
      >
        <Header className="layout-admin__header">
          <MenuTop
            menuCollapse={menuCollapse}
            setMenuCollapse={setMenuCollapse}
          />
        </Header>
        <Content className="layout-admin__content">
          <LoadRoutes routes={routes} />
        </Content>
        <Footer className="layout-admin__footer">Facci Uleam 2020</Footer>
      </Layout>
    </Layout>
  );
  }
  return null
};

function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}

export default LayoutAdmin;
