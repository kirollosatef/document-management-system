import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { userLinks, serverLinks } from "./LinksTypes";

function Links() {
  const { id } = useParams();
  const location = useLocation();
  const links = location.pathname.includes("server/") ? serverLinks : userLinks;
  const navigate = useNavigate();

  return (
    <div className="dashboardSidebar-links">

      {links.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.id}
            className={`dashboardSidebar-links-link ${location.pathname === item.link ? "active" : ""
              }`} onClick={() => {
             
                navigate(location.pathname.includes("server/")
                ? `/dashboard/server/${id}/${item.link}`
                : `${item.link}`)
              }}>
            <div className="dashboardSidebar-links-link-icon">
              <Icon />
            </div>
            <div className="dashboardSidebar-links-link-text">{item.text}</div>
            
          </div>
        );
      })}
    </div>
  );
}

export default Links;
