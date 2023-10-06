import bell from "@assets/icons/1/bell.png";
import { Menu } from "@mui/icons-material";

function Toolbar({ setOpenSidebar }) {
  const newNotification = true;

  const user = {
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
          <img src={bell} alt="bell" />
        </div>
        <div className="topNavbar-user">
          <div className="topNavbar-user-name">{user.username}</div>
          <div className="topNavbar-user-img">
            <img src={user.avatar} alt="avatar" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
