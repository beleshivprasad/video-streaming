import { Suspense, lazy } from "react";

import AppLayout from "../layouts/AppLayout";
import AuthLayout from "../layouts/AuthLayout";
import Loader from "../components/common/Loader";

const Home = lazy(() => import("../pages/Home/index"));
const Login = lazy(() => import("../pages/Login/index"));
const Register = lazy(() => import("../pages/Register/index"));
const Profile = lazy(() => import("../pages/Profile/index"));

const routes = [
  {
    path: "/login",
    element: (
      <AuthLayout>
        <Suspense fallback={<Loader />}>
          <Login />
        </Suspense>
      </AuthLayout>
    )
  },
  {
    path: "/register",
    element: (
      <AuthLayout>
        <Suspense fallback={<Loader />}>
          <Register />
        </Suspense>
      </AuthLayout>
    )
  },
  // protected routes
  {
    path: "/",
    element: (
      <AppLayout>
        <Suspense fallback={<Loader />}>
          <Home />
        </Suspense>
      </AppLayout>
    )
  },
  {
    path: "/profile",
    element: (
      <AppLayout>
        <Suspense fallback={<Loader />}>
          <Profile />
        </Suspense>
      </AppLayout>
    )
  }
];

export default routes;
