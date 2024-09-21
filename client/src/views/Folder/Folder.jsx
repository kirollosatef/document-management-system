import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteFolder, folderDetails, moveArchiveToTrash } from "@store/folders/foldersActions";
import UniTable from "@components/Common/UniversalTable/UniTable";
import {
  resetSelectedItem,
  resetToolbar,
  setPageName,
  setRemove,
  setSelectedItem,
} from "@store/toolsbar/toolsbarSlice";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import UniAlertDialog from "@components/Common/UniversalAlertDialog/UniAlertDialog";
import FolderDialog from "@components/Folder/FolderDialog/FolderDialog";
import "./Folder.scss";
import { reset } from "@store/folders/foldersSlice";
import { toast } from "react-toastify";
import Loading from "@components/Common/Loading/Loading";
import FoldersItem from "@components/Folders/FoldersItem/FoldersItem";
import SubFolderDialog from "@components/Folder/SubFolderDialog/SubFolderDialog";
import NoDataMsg from "@components/Common/NoDataMsg/NoDataMsg";
import FoldersDialog from "@components/Folders/FoldersDialog/FoldersDialog";

function Folder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { folderDetails: folder, deleted, loading, error, message } = useSelector((state) => state.folders);
  const { open, components } = useSelector((state) => state.toolsbar);
  const { selectedItem } = components;

  const headers = [
    { id: "_id", label: "ID" },
    { id: "title", label: "الموضوع" },
    { id: "issueNumber", label: "رقم الكتاب" },
    { id: "creator", label: "المنشئ" },
    { id: "date", label: "التاريخ" },
  ];

  const handleClick = (obj) => {
    dispatch(
      setSelectedItem({
        type: folder?.subFolders?.length > 0 ? "folder" : "archive",
        item: obj,
      })
    );
  };

  const handleDoubleClick = (obj) => {
    if (selectedItem?.item?._id === obj._id) {
      navigate(`/archives/${obj._id}`);
    } else {
      dispatch(setSelectedItem({ type: "archive", item: obj }));
    }
  };

  const handleMoveToTrash = () => {
    dispatch(setRemove(true));
  };

  const alertHandleClose = () => {
    dispatch(setRemove(false));
    dispatch(resetToolbar());
  };

  const alertHandleConfirm = (reason) => {
    if (selectedItem?.type === "folder") {
      dispatch(deleteFolder(selectedItem?.item?._id));
    } else {
      dispatch(moveArchiveToTrash({ id: selectedItem?.item?._id, reason }));
    }
  };

  useEffect(() => {
    dispatch(setPageName("folderDetails"));
    dispatch(folderDetails(id));
    dispatch(resetSelectedItem());
  }, [id, dispatch]);

  useEffect(() => {
    if (open) {
      if (selectedItem?.item?.isRoot) {
        navigate(`/folders/${selectedItem.item._id}`);
      } else {
        navigate(`/archives/${selectedItem.item._id}`);
      }
      dispatch(resetToolbar());
    }
    if (deleted) {
      toast.success(!folder?.isRoot ? "تم حذف المجلد الفرعي بنجاح" : "تم نقل الأرشيف إلى سلة المحذوفات بنجاح");
      dispatch(reset());
      dispatch(resetToolbar());
    }
  }, [open, deleted, selectedItem, folder, navigate, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(reset());
      dispatch(resetToolbar());
    }
  }, [error, message, dispatch]);

  const actions = [
    { label: "نقل إلى سلة المحذوفات", onClick: handleMoveToTrash, icon: <DeleteOutlineIcon />, color: "error" },
  ];

  if (loading) return <Loading />;

  return (
    <div>
      <Box mb={5} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ flex: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {folder?.name}
          </Typography>
          <Typography variant="body1">{folder?.description}</Typography>
        </div>
        <div style={{ flex: 2 }} className="creator">
          <Typography sx={{ fontSize: 12, fontWeight: 800, color: "#999", gap: 1 }} className="flex-items-center">
            <BeenhereIcon sx={{ fontSize: 12 }} />
            <span> منشئ المجلد: </span>
          </Typography>
          <Typography sx={{ fontSize: 15 }}>{folder?.creator?.name}</Typography>
        </div>
      </Box>

      {!folder?.isRoot ? (
        folder?.subFolders?.length === 0 ? (
          <NoDataMsg msg="لا يوجد مجلدات فرعيه" />
        ) : (
          <div className="folders">
            <Grid container spacing={2}>
              {folder?.subFolders?.map((item) => (
                <FoldersItem key={item._id} folder={item} handleClick={handleClick} />
              ))}
            </Grid>
          </div>
        )
      ) : (
        <Box>
          <UniTable
            headers={headers}
            data={folder?.archives || []}
            title="الأرشيف"
            handleClick={handleDoubleClick}
            selectedItem={selectedItem?.item}
            noDataMsg={"لا يوجد بيانات حتى الآن"}
            actions={actions}
          />
        </Box>
      )}

      <SubFolderDialog />
      {folder?.isRoot && <FolderDialog />}
      {!folder?.isRoot && <FoldersDialog />}
      <UniAlertDialog
        handleClose={alertHandleClose}
        handleConfirm={alertHandleConfirm}
        text={
          folder?.subFolders?.length > 0
            ? `هل تريد حذف المجلد ${selectedItem?.item?.name}؟`
            : `هل تريد نقل الأرشيف ${selectedItem?.item?.title} إلى سلة المحذوفات؟`
        }
        isFileDelete={folder?.isRoot}
      />
    </div>
  );
}

export default Folder;