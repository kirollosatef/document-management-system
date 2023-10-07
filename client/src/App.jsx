import RequireAuth from "@components/Common/RequireAuth/RequireAuth";
import Layout from "@components/Layout/Layout";
import Home from "@views/Home/Home";
import Login from "@views/Login/Login";
import Users from "@views/Users/Users";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          element: <RequireAuth/>,
          children: [
            {
              path: "/",
              element: <Home />,
            },
            {
              path: "users",
              element: <Users />,
            },
          ]
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

export default App