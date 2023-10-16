import { useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { archiveDetails, deleteArchive, folderDetails } from "@store/folders/foldersActions";
import UniTable from "@components/Common/UniversalTable/UniTable";
import {
  resetToolbar,
  setPageName,
  setRemove,
  setSelectedItem,
} from "@store/toolsbar/toolsbarSlice";
import UniAlertDialog from "@components/Common/UniversalAlertDialog/UniAlertDialog";
import FolderDialog from "@components/Folder/FolderDialog/FolderDialog";

function Archive() {
  const navigate = useNavigate()
  const { id } = useParams();
  const dispatch = useDispatch();
  const { folderDetails: folder } = useSelector((state) => state.folders);
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
    dispatch(setPageName("archiveDetails"));
    dispatch(archiveDetails(id));
  }, []);

  useEffect(() => {
    if (open) {
      navigate(`/archives/${selectedItem.item._id}`)
    }
  }, [open])
  
  return (
    <div>
      <Box mb={5}>
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          {folder?.name}
        </Typography>
        <Typography variant="body1">{folder?.description}</Typography>
      </Box>
      <Box>
        {/* <UniTable
          headers={headers}
          data={folder?.archives || []}
          title="الارشيف"
          handleClick={handleClick}
          selectedItem={selectedItem?.item}
          noDataMsg={"لا يوجد بيانات حتي الان"}
        /> */}
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

export default Archive;
