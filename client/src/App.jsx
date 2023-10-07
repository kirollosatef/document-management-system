import Layout from "@components/Layout/Layout";
import Home from "@views/Home/Home";
import Users from "@views/Users/Users";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/users",
          element: <Users />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App