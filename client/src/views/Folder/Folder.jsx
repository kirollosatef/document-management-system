import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteArchive,
  deleteFolder,
  folderDetails,
} from "@store/folders/foldersActions";
import UniTable from "@components/Common/UniversalTable/UniTable";
import {
  resetSelectedItem,
  resetToolbar,
  setPageName,
  setRemove,
  setSelectedItem,
} from "@store/toolsbar/toolsbarSlice";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import UniAlertDialog from "@components/Common/UniversalAlertDialog/UniAlertDialog";
import FolderDialog from "@components/Folder/FolderDialog/FolderDialog";
import "./Folder.scss";
import { reset } from "@store/folders/foldersSlice";
import { toast } from "react-toastify";
import Loading from "@components/Common/Loading/Loading";
import EmptyFolder from "@components/Folder/EmptyFolder/EmptyFolder";
import FoldersItem from "@components/Folders/FoldersItem/FoldersItem";
import SubFolderDialog from "@components/Folder/SubFolderDialog/SubFolderDialog";
import NoDataMsg from "@components/Common/NoDataMsg/NoDataMsg";
import FoldersDialog from "@components/Folders/FoldersDialog/FoldersDialog";

function Folder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    folderDetails: folder,
    deleted,
    loading,
    error,
    message,
  } = useSelector((state) => state.folders);
  const { open, update, add, components } = useSelector(
    (state) => state.toolsbar
  );
  const { selectedItem } = components;
  const emptyFolder =
    folder?.subFolders?.length === 0 && folder?.archives?.length === 0;
  const headers = [
    { id: "_id", label: "ID" },
    { id: "title", label: "الاسم" },
    { id: "description", label: "الوصف" },
    {
      id: "exporter",
      label: "المصدر",
    },
    {
      id: "importer",
      label: "المستورد",
    },
    {
      id: "creator",
      label: "المنشئ",
    },
    {
      id: "date",
      label: "التاريخ",
    },
  ];
  //  ========== Actions ==========
  const handleClick = (obj) => {
    dispatch(
      setSelectedItem({
        type: folder?.subFolders?.length > 0 ? "folder" : "archive",
        item: obj,
      })
    );
  };
  const alertHandleClose = () => {
    dispatch(setRemove(false));
    dispatch(resetToolbar());
  };
  const alertHandleConfirm = () => {
    selectedItem?.type === "folder"
      ? dispatch(deleteFolder(selectedItem?.item?._id))
      : dispatch(deleteArchive(selectedItem?.item?._id));
  };

  // Fetch Data
  useEffect(() => {
    dispatch(setPageName("folderDetails"));
    dispatch(folderDetails(id));
    dispatch(resetSelectedItem());
  }, [id]);

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
      toast.success(
        !folder?.isRoot ? "تم حذف المجلد الفرعي بنجاح" : "تم حذف الارشيف بنجاح"
      );
      dispatch(reset());
      dispatch(resetToolbar());
    }
  }, [open, deleted]);
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(reset());
      dispatch(resetToolbar());
    }
  }, [error]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Box
        mb={5}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}>
        <div style={{ flex: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {folder?.name}
          </Typography>
          <Typography variant="body1">{folder?.description}</Typography>
        </div>
        <div style={{ flex: 2 }} className="creator">
          <Typography
            sx={{ fontSize: 12, fontWeight: 800, color: "#999", gap: 1 }}
            className="flex-items-center">
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
                <FoldersItem
                  key={item._id}
                  folder={item}
                  handleClick={handleClick}
                />
              ))}
            </Grid>
          </div>
        )
      ) : (
        <>
          <Box>
            <UniTable
              headers={headers}
              data={folder?.archives || []}
              title="الارشيف"
              handleClick={handleClick}
              selectedItem={selectedItem?.item}
              noDataMsg={"لا يوجد بيانات حتي الان"}
            />
          </Box>
        </>
      )}
      <SubFolderDialog />
      {/* Add or Update Archive */}
      {folder?.isRoot && <FolderDialog />}
      {/* Add or Update Folder */}
      {!folder?.isRoot && <FoldersDialog />}
      <UniAlertDialog
        handleClose={alertHandleClose}
        handleConfirm={alertHandleConfirm}
        text={
          folder?.subFolders?.length > 0
            ? `هل تريد حذف المجلد ${selectedItem?.item?.name}`
            : `هل تريد حذف الارشيف ${selectedItem?.item?.title}`
        }
      />
    </div>
  );
}

export default Folder;
