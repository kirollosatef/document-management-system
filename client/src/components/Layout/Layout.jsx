import { Outlet } from "react-router-dom";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
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
          <Grid container className="admin" sx={{ height: "100vh" }}>
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
              }}
            >
              <Sidebar
                openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
            </Grid>
            <Grid flex={1} sx={{ height: "100%" }}>
              <Toolbar
                // openSidebar={openSidebar}
                setOpenSidebar={setOpenSidebar}
              />
              <Box p={3}>
                <Outlet />
              </Box>
            </Grid>
          </Grid>
        </main>
    </div>
  );
}

export default Layout;
