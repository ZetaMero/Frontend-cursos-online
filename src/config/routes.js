// Layout
import LayoutAdmin from "../layouts/LayoutAdmin";
// layoubasic
import LayoutBasic from "../layouts/LayoutBasic";
// Admin pages
import AdminHome from "../pages/Admin";

import AdminSignInSingOut from "../pages/Admin/SignInSingOut/SignInSingOut";

// Pages
import Home from "../pages/Home";
// other
import Error404 from "../pages/Error404";
const routes = [
  {
    path: "/admin",
    component: LayoutAdmin,
    exact: false,
    routes: [
      {
        path: "/admin",
        component: AdminHome,
        exact: true,
      },
      {
        path: "/admin/login",
        component: AdminSignInSingOut,
        exact: true,
      },
      {
          component: Error404
      }
    ],
  },
  {
    path: "/",
    component: LayoutBasic,
    exact: false,
    routes: [
      {
        path: "/",
        component: Home,
        exact: true,
      },
      {
        component: Error404
    }
    ],
  },
];

export default routes;
