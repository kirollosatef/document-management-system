import { Outlet } from "react-router-dom";
import { Box, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";
import "./Layout.scss";
import { useEffect, useState } from "react";
import Toolbar from "./Toolbar/Toolbar";
function Layout() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery("(min-width: 992px)");
  const [openSidebar, setOpenSidebar] = useState(false);
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
              flex: "0 0 18rem",
              display: isLargeScreen || openSidebar ? "flex" : "none",
              height: "100%",
              position: openSidebar ? "fixed" : "relative",
              right: 0,
              width: "100%",
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
          <Grid sx={{ flex:1,height: "100%",overflow:"hidden" }}>
            <Stack px={4} py={2} height={"90vh"}>
              <Outlet />
            </Stack>
            <Toolbar setOpenSidebar={setOpenSidebar} />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

export default Layout;
