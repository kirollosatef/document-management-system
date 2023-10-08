import { useLocation, useNavigate, useParams } from "react-router-dom";
import { userLinks } from "./LinksTypes";
import LogoutIcon from "@mui/icons-material/Logout";
import { logout } from "@store/auth/authSlice";
import { useDispatch } from "react-redux";
function Links() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const links = userLinks;
  const navigate = useNavigate();

  return (
    <div className="sidebar-links">
      {links.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className={`sidebar-links-link ${
              location.pathname === item.link ? "active" : ""
            }`}
            onClick={() => {
              navigate(
                location.pathname.includes("server/")
                  ? `/dashboard/server/${id}/${item.link}`
                  : `${item.link}`
              );
            }}>
            <div className="sidebar-links-link-icon">
              <Icon />
            </div>
            <div className="sidebar-links-link-text">{item.text}</div>
          </div>
        );
      })}
      <div className={`sidebar-links-link`} onClick={() => {}}>
        <div className="sidebar-links-link-icon">
          <LogoutIcon />
        </div>
        <div
          className="sidebar-links-link-text"
          onClick={() => dispatch(logout())}>
          تسجيل الخروج
        </div>
      </div>
    </div>
  );
}

export default Links;
