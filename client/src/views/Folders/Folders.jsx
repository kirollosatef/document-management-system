import { Grid, Typography } from "@mui/material";
import './folders.scss'
import FoldersItem from "@components/Folders/FoldersItem/FoldersItem";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFolder, getFolders } from "@store/folders/foldersActions";
import { resetSelectedItem, resetToolbar, setRemove, setSelectedItem } from "@store/toolsbar/toolsbarSlice";
import { toast } from "react-toastify";
import { reset } from "@store/folders/foldersSlice";
import FoldersDialog from "@components/Folders/FoldersDialog/FoldersDialog";
import UniAlertDialog from "@components/Common/UniversalAlertDialog/UniAlertDialog";

function Folders() {
  const dispatch = useDispatch()
  const { allFolders, error, message, loading, actionsLoading } = useSelector(state => state.folders)
  const { selectedItem } = useSelector((state) => state.toolsbar.components);
  
  //  ========== Actions ==========
  const alertHandleClose = () => {
    dispatch(setRemove(false));
    dispatch(resetToolbar());
  };
  const alertHandleConfirm = () => {
    dispatch(deleteFolder(selectedItem?.item?._id));
  };

  //  ========== Fetch Data ==========
  useEffect(() => {
    dispatch(getFolders())
    dispatch(resetSelectedItem());
  }, [dispatch]);
  
  //  ========== Displaying Any Error  ==========
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(reset());
    }
  }, [error]);
  
  
  return (
    <div className="folders">
      <Typography variant="h6">المجلدات</Typography>
      {/* ======= Folders Items ======= */}
      <Grid container spacing={4}> 
        {allFolders?.map(item => <FoldersItem key={item._id} folder={item} />)}
      </Grid>
      <FoldersDialog />
      <UniAlertDialog
        handleClose={alertHandleClose}
        handleConfirm={alertHandleConfirm}
        text={`هل تريد حذف الـمستخدم ${selectedItem?.item?.username}؟`}
      />
    </div>
  );
}

export default Folders;