import { Grid, Typography } from "@mui/material";
import FoldersItem from "@components/Folders/FoldersItem/FoldersItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFolder, getFolders } from "@store/folders/foldersActions";
import {
  resetSelectedItem,
  resetToolbar,
  setPageName,
  setRemove,
  setSelectedItem,
} from "@store/toolsbar/toolsbarSlice";
import { toast } from "react-toastify";
import { reset } from "@store/folders/foldersSlice";
import FoldersDialog from "@components/Folders/FoldersDialog/FoldersDialog";
import UniAlertDialog from "@components/Common/UniversalAlertDialog/UniAlertDialog";
import "./Folders.scss";
import { useNavigate } from "react-router-dom";

function Folders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { allFolders, error, message, loading, actionsLoading,deleted } = useSelector(
    (state) => state.folders
  );
  const { components,open } = useSelector((state) => state.toolsbar);
  const { selectedItem } = components

  //  ========== Actions ==========
  const handleClick = (obj) => {
    dispatch(setSelectedItem({ type: "folder", item: obj }));
  };
  const alertHandleClose = () => {
    dispatch(setRemove(false));
    dispatch(resetToolbar());
  };
  const alertHandleConfirm = () => {
    dispatch(deleteFolder(selectedItem?.item?._id));
  };

  //  ========== Fetch Data ==========
  useEffect(() => {
    dispatch(getFolders());
    dispatch(resetSelectedItem());
    dispatch(setPageName("folders"));
  }, [dispatch]);

  //  ========== Displaying Any Error  ==========
  useEffect(() => {
    if (error) {
      toast.error(message);
    }
    dispatch(reset());
  }, [error]);
  useEffect(() => {
    if (open) {
      navigate(`/folders/${selectedItem.item._id}`);
      dispatch(resetToolbar());
      dispatch(resetSelectedItem());
    }
    if (deleted) {
      dispatch(reset())
      dispatch(resetToolbar());
    }
  }, [open,deleted]);

  return (
    <div className="folders">
      <Typography variant="h6">المجلدات</Typography>
      {/* ======= Folders Items ======= */}
      <Grid container spacing={2}>
        {allFolders?.map((item) => (
          <FoldersItem key={item._id} folder={item} handleClick={handleClick} />
        ))}
      </Grid>
      <FoldersDialog />
      <UniAlertDialog
        handleClose={alertHandleClose}
        handleConfirm={alertHandleConfirm}
        text={`هل تريد حذف الـمستخدم ${selectedItem?.item?.name}؟`}
      />
    </div>
  );
}

export default Folders;
