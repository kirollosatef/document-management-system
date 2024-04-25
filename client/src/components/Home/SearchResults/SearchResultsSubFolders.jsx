import UniTable from "@components/Common/UniversalTable/UniTable";
import { setPageName, setSelectedItem } from "@store/toolsbar/toolsbarSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { folderDetails } from "@store/folders/foldersActions";
import { useNavigate } from "react-router-dom";
import Loading from "@components/Common/Loading/Loading";
import { Grid, Typography } from "@mui/material";
import NoDataMsg from "@components/Common/NoDataMsg/NoDataMsg";
import FoldersItem from "@components/Folders/FoldersItem/FoldersItem";
import FoldersDialog from "@components/Folders/FoldersDialog/FoldersDialog";
import UniAlertDialog from "@components/Common/UniversalAlertDialog/UniAlertDialog";

function SearchResultsSubFolders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { searchResultSubFolders, loading, searchLoading } = useSelector((state) => state.folders);
  const { open, components } = useSelector((state) => state.toolsbar);
  const { selectedItem } = components;
  const [allFolders, setAllFolders] = useState([]);
  // Fetch Data
  useEffect(() => {
    dispatch(setPageName("home"));
    // dispatch(folderDetails(id));
  }, []);

  useEffect(() => {
    if (searchResultSubFolders) {
      setAllFolders(searchResultSubFolders);
    }
  }, [searchResultSubFolders]);

  const handleClick = (obj) => {
    window.location.href = `/folders/${obj._id}`;
  };

  return (
    <div className="search-result">
      {!searchResultSubFolders ? (
        <></>
      ) : (
        <>
          <div className="folders">
            <Typography variant="h6">المجلدات</Typography>
            {loading ? (
              <Loading />
            ) : allFolders?.length < 1 ? (
              <NoDataMsg msg="لا يوجد مجلدات" />
            ) : (
              <>
                <Grid
                  container
                  spacing={2}
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {allFolders?.map((item) => (
                    <div key={item._id} onClick={() => handleClick(item)}>
                      <FoldersItem key={item._id} folder={item} handleClick={handleClick} />
                    </div>
                  ))}
                </Grid>
              </>
            )}
            <FoldersDialog />
          </div>
        </>
      )}
    </div>
  );
}

export default SearchResultsSubFolders;
