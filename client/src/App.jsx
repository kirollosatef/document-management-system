import { Suspense } from "react";
import { lazy } from "react";
import RequireAuth from "@components/Common/RequireAuth/RequireAuth";
import Layout from "@components/Layout/Layout";
import Home from "@views/Home/Home";
import Login from "@views/Login/Login";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Loading from "@components/Common/Loading/Loading";

const users = {
  Users: lazy(() => import("@views/Users/Users")),
};
const departments = {
  Departments: lazy(() => import("@views/Departments/Departments")),
};
const folders = {
  Folders: lazy(() => import("@views/Folders/Folders")),
  Folder: lazy(() => import("@views/Folder/Folder")),
};
const archive = {
  Archive: lazy(() => import("@views/Archive/Archive")),
};
const settings = {
  Settings: lazy(() => import("@views/Settings/Settings")),
};
const help = {
  Help: lazy(() => import("@views/Help/Help")),
};
const addBook = {
  AddBook: lazy(() => import("@views/AddBook/AddBook")),
};
const trash = {
  Trash: lazy(() => import("@views/Trash/Trash")),
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
                <Suspense fallback={<Loading />}>
                  <users.Users />
                </Suspense>
              ),
            },
            {
              path: "departments",
              element: (
                <Suspense fallback={<Loading />}>
                  <departments.Departments />
                </Suspense>
              ),
            },
            {
              path: "archives/:id",
              element: (
                <Suspense fallback={<Loading />}>
                  <archive.Archive />
                </Suspense>
              ),
            },
            {
              path: "folders",
              element: (
                <Suspense fallback={<Loading />}>
                  <folders.Folders />
                </Suspense>
              ),
            },
            {
              path: "folders/:id",
              element: (
                <Suspense fallback={<Loading />}>
                  <folders.Folder />
                </Suspense>
              ),
            },
            {
              path: "add-book",
              element: (
                <Suspense fallback={<Loading />}>
                  <addBook.AddBook />
                </Suspense>
              ),
            },
            {
              path: "settings",
              element: (
                <Suspense fallback={<Loading />}>
                  <settings.Settings />
                </Suspense>
              ),
            },
            {
              path: "help",
              element: (
                <Suspense fallback={<Loading />}>
                  <help.Help />
                </Suspense>
              ),
            },
            {
              path: "trash",
              element: (
                <Suspense fallback={<Loading />}>
                  <trash.Trash />
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
