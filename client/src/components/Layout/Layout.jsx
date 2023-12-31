import { Outlet } from "react-router-dom";
import { Box, Grid, Stack, useMediaQuery, useTheme,Paper } from "@mui/material";
import Sidebar from "./Sidebar/Sidebar";
import "./Layout.scss";
import { useEffect, useState } from "react";
import Toolbar from "./Toolbar/Toolbar";
import { useSelector } from "react-redux";
import { setOpen } from "@store/toolsbar/toolsbarSlice";
import { styled } from "@mui/material/styles";
function Layout() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery("(min-width: 992px)");
  const [openSidebar, setOpenSidebar] = useState(false);
  const { toolbarPosition, pageName } = useSelector(
    (state) => state.toolsbar.components
  );
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  useEffect(() => {
    if (isLargeScreen) {
      setOpenSidebar(false);
    }
  }, [isLargeScreen]);
  useEffect(() => {
    if (pageName !== "archiveDetails") {
      setOpen(false);
    }
  }, [pageName]);
  return (
    <div className="app">
      <main className="app-main">
        <Grid
          container
          className="admin"
          sx={{ height: "100vh", flexWrap: "nowrap" }}>
          <Grid
            sx={{
              width: isLargeScreen ? "25%" : "100%",
              display: isLargeScreen || openSidebar ? "flex" : "none",
              position: openSidebar ? "fixed" : "sticky",
              top: 0,
              right: 0,
              height: "100%",
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

          <Grid
            sx={{
              flex: 1,
              width: isLargeScreen ? "75%" : "100%",
              height: "100%",
            }}>
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
