import React from "react";
import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";

export default function LayoutBasic(props) {
  const { routes } = props;
  const { Content, Footer } = Layout;
  return (
    <Layout>
      <Layout>
        <h2>Menu sidebar</h2>
        <Layout>
          <Content>
            <LoadRouters routes={routes} />
          </Content>
          <Footer>Facci Uleam 2020</Footer>
        </Layout>
      </Layout>
    </Layout>
  );
}
function LoadRouters({ routes }) {
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
