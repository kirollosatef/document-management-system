import { Skeleton } from "@mui/material";

function SkeletonLinks() {
  return [...Array(6)].map((_, i) => (
    <div key={i} className="dashboardSidebar-links">
      <div className="dashboardSidebar-links-link">
        <div className="dashboardSidebar-links-link-icon">
          {/* <SevereColdRoundedIcon /> */}
          <Skeleton variant="circular" width={30} height={30} />
        </div>
        <Skeleton variant="text" width={100} height={30} />
      </div>
    </div>
  ));
}

export default SkeletonLinks;
