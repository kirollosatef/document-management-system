import bell from "@assets/icons/1/bell.png";
import { Menu } from "@mui/icons-material";
import { Avatar, useTheme } from "@mui/material";

function Toolbar({ setOpenSidebar }) {
  const theme = useTheme()
  const newNotification = true;

  const user = {
    name:"Mohammed",
    username: "محمد رمضان",
    avatar:""
  }

  return (
    <div className="topNavbar">
      <div className="topNavbar-burger" onClick={() => setOpenSidebar(true)}>
        <Menu />
      </div>
      <div className="topNavbar-left">
        <div
          className={`topNavbar-bell ${newNotification ? "green-square" : ""}`}>
          {/* <img src={bell} alt="bell" /> */}
        </div>
        <div className="topNavbar-user">
          <div className="topNavbar-user-name">{user.username}</div>
          <div className="topNavbar-user-img">
          <Avatar
              sx={{
                bgcolor: theme.palette.role.superadmin,
                width: 40,
                height: 40,
                fontSize:15
              }}
            >
              {user.name.slice(0, 2)}
            </Avatar>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
