import { Skeleton } from "@mui/material";

function SearchBarSkeleton() {
    return (
        <div className="searchBar">
            <Skeleton
                className="skeleton"
                variant="rectangular"
                sx={{
                    width: `100%`,
                    height: `2rem`,
                    borderRadius: "1rem",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                }}
            />
        </div>
    );
}

export default SearchBarSkeleton;
