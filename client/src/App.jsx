import { Suspense } from "react";
import { lazy } from "react";
import RequireAuth from "@components/Common/RequireAuth/RequireAuth";
import Layout from "@components/Layout/Layout";
import Home from "@views/Home/Home";
import Login from "@views/Login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

const users = {
  Users: lazy(() => import("@views/Users/Users")),
};
const departments = {
  Departments: lazy(() => import("@views/Departments/Departments")),
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          element: <RequireAuth />,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "users",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <users.Users />
                </Suspense>
              ),
            },
            {
              path: "departments",
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <departments.Departments />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
