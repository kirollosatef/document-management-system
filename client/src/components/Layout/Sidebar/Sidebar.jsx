import Links from "./Links/Links";
import logo from "@assets/icons/1/logo.png";
import crownWhite from "@assets/icons/1/crown-white.png";
import "./Sidebar.scss";
// import { useMediaQuery } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import SkeletonLinks from "@components/Common/Skeleton/Sidebar/SkeletonLinks";


function Sidebar({ openSidebar, setOpenSidebar }) {
  const loading = false;
  const user = {
    username: "محمد رمضان",
    avatar: "",
  };
  return (
    <div className="dashboardSidebar">
      {/* top bar in mobile */}
      {openSidebar && (
        <div className="dashboardSidebar-topBar">
          <div
            className="dashboardSidebar-topBar-burger"
            onClick={() => setOpenSidebar(false)}
          >
            <Close />
          </div>
          <div className="dashboardSidebar-topBar-left">
            <div className="dashboardSidebar-topBar-user">
              <div className="dashboardSidebar-topBar-user-name">
                {user.username}
              </div>
            </div>
          </div>
        </div>
      )}
      {/* User-Info Code */}
      <div className="dashboardSidebar-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="dashboardSidebar-user">
        <div className="dashboardSidebar-user-img">
          {!loading ? (
            <img src={user.avatar} alt="user-img" />
          ) : (
            <Skeleton variant="circular" width={99} height={99} />
          )}
          {loading ? (
            <div className="dashboardSidebar-user-img-special">
              <Skeleton variant="circular" width={30} height={30} />
            </div>
          ) : (
            <div className="dashboardSidebar-user-img-special">
              <img src={crownWhite} alt="crown" />
            </div>
          )}
        </div>
        <div className="dashboardSidebar-user-name">
          {!loading && (
            <Skeleton sx={{ width: 100 }} height={35} variant="text" />
          )}
        </div>
      </div>
      {/* Links Component */}
      {!loading ? <Links /> : <SkeletonLinks />}
    </div>
  );
}

export default Sidebar;
