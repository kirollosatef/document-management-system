import { Outlet } from "react-router-dom";
import { Box, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";
import "./Layout.scss";
import { useEffect, useState } from "react";
import Toolbar from "./Toolbar/Toolbar";
import { useSelector } from "react-redux";
function Layout() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery("(min-width: 992px)");
  const [openSidebar, setOpenSidebar] = useState(false);
  const { toolbarPosition } = useSelector((state) => state.toolsbar.components);
  useEffect(() => {
    if (isLargeScreen) {
      setOpenSidebar(false);
    }
  }, [isLargeScreen]);

  return (
    <div className="app">
      <main className="app-main">
        <Grid
          container
          className="admin"
          sx={{ height: "100vh", flexWrap: "nowrap" }}>
          <Grid
            sx={{
              width: "25%",
              display: isLargeScreen || openSidebar ? "flex" : "none",
              position: openSidebar ? "fixed" : "sticky",
              top: 0,
              right: 0,
              height: "0",
              backgroundColor: openSidebar
                ? theme.palette.background.default
                : "unset",
              zIndex: 999,
            }}>
            <Sidebar
              openSidebar={openSidebar}
              setOpenSidebar={setOpenSidebar}
            />
          </Grid>

          <Grid sx={{ flex: 1, width: "75%", height: "100%" }}>
            {toolbarPosition === "top" && (
              <Toolbar setOpenSidebar={setOpenSidebar} />
            )}
            <Stack px={4} py={2} minHeight={"90vh"}>
              <Outlet />
            </Stack>
            {toolbarPosition === "bottom" && (
              <Toolbar setOpenSidebar={setOpenSidebar} />
            )}
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default Layout;
