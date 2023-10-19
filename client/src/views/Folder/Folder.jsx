import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteArchive, folderDetails } from "@store/folders/foldersActions";
import UniTable from "@components/Common/UniversalTable/UniTable";
import {
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

function Folder() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { folderDetails: folder, deleted,loading } = useSelector(
    (state) => state.folders
  );
  const { open, components } = useSelector((state) => state.toolsbar);
  const { selectedItem } = components;
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
    dispatch(setSelectedItem({ type: "archive", item: obj }));
  };
  const alertHandleClose = () => {
    dispatch(setRemove(false));
    dispatch(resetToolbar());
  };
  const alertHandleConfirm = () => {
    dispatch(deleteArchive(selectedItem?.item?._id));
  };
  useEffect(() => {
    dispatch(setPageName("folderDetails"));
    dispatch(folderDetails(id));
  }, []);

  useEffect(() => {
    if (open) {
      navigate(`/archives/${selectedItem.item._id}`);
      dispatch(resetToolbar());
    }
    if (deleted) {
      toast.success("تم حذف الارشيف بنجاح");
      dispatch(reset());
      dispatch(resetToolbar());
    }
  }, [open, deleted]);

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
          {" "}
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
      <FolderDialog />
      <UniAlertDialog
        handleClose={alertHandleClose}
        handleConfirm={alertHandleConfirm}
        text={`هل تريد حذف الارشيف ${selectedItem?.item?.title}؟`}
      />
    </div>
  );
}

export default Folder;
