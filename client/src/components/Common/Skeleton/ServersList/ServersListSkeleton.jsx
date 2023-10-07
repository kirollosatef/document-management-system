import { Skeleton } from "@mui/material";

function ServersListSkeleton() {
  return (
    <div>
      <div className="servers-list">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="servers-list-item">
            <div className="servers-list-item-img">
              <Skeleton
                className="skeleton"
                variant="rectangular"
                sx={{
                  width: 80,
                  height: 80,
                  borderRadius: "1rem",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
              />
            </div>
            <div className="servers-list-item-content">
              <div className="servers-list-item-content-name">
                <Skeleton
                  className="skeleton"
                  variant="rectangular"
                  sx={{
                    width: 100,
                    height: 20,
                    borderRadius: ".1rem",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>
              <div className="servers-list-item-content-desc">
                <Skeleton
                  className="skeleton"
                  variant="rectangular"
                  sx={{
                    width: 200,
                    height: 10,
                    borderRadius: ".1rem",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  }}
                />
              </div>
              <div className="servers-list-item-content-btn">
                <div className="servers-list-item-content-btn-text">
                  <Skeleton
                    className="skeleton"
                    variant="rectangular"
                    sx={{
                      width: 100,
                      height: 30,
                      borderRadius: ".1rem",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServersListSkeleton;
