import Links from "./Links/Links";

import "./Sidebar.scss";
// import { useMediaQuery } from "@mui/material";
import { Close } from "@mui/icons-material";
import {
  Avatar,
  Skeleton,
  Typography,
  useTheme,
} from "@mui/material";
import SkeletonLinks from "@components/Common/Skeleton/Sidebar/SkeletonLinks";
import UniChip from "@components/Common/UniversalChip/UniChip";
import { useSelector } from "react-redux";
import logo from "@assets/logo.png";

function Sidebar({ openSidebar, setOpenSidebar }) {
  const theme = useTheme();
  const {user} = useSelector(state => state.auth)
  const loading = false;
  return (
    <div className="sidebar">
      {/* top bar in mobile */}
      {openSidebar && (
        <div className="sidebar-topBar">
          <div
            className="sidebar-topBar-burger"
            onClick={() => setOpenSidebar(false)}
          >
            <Close sx={{fontSize:"1.5rem"}} />
          </div>
          {/* <div className="sidebar-topBar-left">
            <div className="sidebar-topBar-user">
              <div className="sidebar-topBar-user-name">{user?.username}</div>
            </div>
          </div> */}
        </div>
      )}
      {/* User-Info Code */}
      <div className="sidebar-logo">
        <img src={logo} alt="logo" width={50} />
        مديرية بلدية السماوة/شعبة الادارة
      </div>
      <div className="sidebar-user">
        <div className="sidebar-user-img">
          {loading ? (
            <Skeleton variant="circular" width={99} height={99} />
          ) : (
            <Avatar
              sx={{
                bgcolor: theme.palette.role.superadmin,
                width: 100,
                height: 100,
                fontSize: 50,
              }}
            >
              {user?.name?.slice(0, 2)}
            </Avatar>
          )}
        </div>
        <div className="sidebar-user-role">
          {loading ? (
            <Skeleton sx={{ width: 100 }} height={35} variant="text" />
          ) : (
            <UniChip label={user?.role} role={user?.role}/>
          )}
        </div>
        <div className="sidebar-user-name">
          {loading ? (
            <Skeleton sx={{ width: 100 }} height={35} variant="text" />
          ) : (
            <Typography> {user?.username} </Typography>
          )}
        </div>
      </div>
      {/* Links Component */}
      {!loading ? <Links setOpenSidebar={setOpenSidebar} /> : <SkeletonLinks />}
    </div>
  );
}

export default Sidebar;
