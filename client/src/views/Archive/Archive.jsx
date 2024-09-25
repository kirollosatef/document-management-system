import { useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  archiveDetails,
  deleteArchive,
  deleteFile,
} from "@store/folders/foldersActions";
import BeenhereIcon from "@mui/icons-material/Beenhere";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import TransitEnterexitIcon from "@mui/icons-material/TransitEnterexit";
import {
  resetSelectedItem,
  resetToolbar,
  setPageName,
  setRemove,
  setSelectedItem,
} from "@store/toolsbar/toolsbarSlice";
import UniAlertDialog from "@components/Common/UniversalAlertDialog/UniAlertDialog";
import "./Archive.scss";
import ArchiveDialog from "@components/Archive/ArchiveDialog/ArchiveDialog";
import FilesList from "@components/Archive/FilesList/FilesList";
import { reset } from "@store/folders/foldersSlice";
import { toast } from "react-toastify";
import Loading from "@components/Common/Loading/Loading";
import dayjs from "dayjs";

function Archive() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const {
    folderDetails: folder,
    archiveDetails: archive,
    deleted,
    loading,
  } = useSelector((state) => state.folders);
  const { open, print, printFile, components } = useSelector(
    (state) => state.toolsbar
  );
  const { selectedItem } = components;
  //  ========== Actions ==========
  const alertHandleClose = () => {
    dispatch(setRemove(false));
    dispatch(resetToolbar());
  };
  const alertHandleConfirm = () => {
    dispatch(deleteFile(selectedItem?.item?._id));
  };

  useEffect(() => {
    dispatch(setPageName("archiveDetails"));
    dispatch(archiveDetails(id));
    dispatch(resetSelectedItem());
  }, [dispatch, id]);

  useEffect(() => {
    if (open) {
      navigate(`/archives/${selectedItem.item._id}`);
    }
    if (printFile) {
      navigate(`/archives/${selectedItem.item._id}`);
    }
    if (deleted) {
      toast.success("تم حذف الملف بنجاح");
      dispatch(reset());
      dispatch(resetToolbar());
    }
  }, [open, deleted, printFile]);

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Box mb={5} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ flex: 10 }}>
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            {archive?.title}
          </Typography>
          <Typography variant="body1">{archive?.description}</Typography>
        </div>
      </Box>
      <Grid container spacing={2} mb={3}>
        <Grid item>
          <div style={{ flex: 2 }} className="creator">
            <Typography sx={{ fontSize: 15, fontWeight: 800, color: "#999", gap: 1 }} className="flex-items-center">
              <BeenhereIcon sx={{ fontSize: 14 }} />
              <span> منشئ الارشيف: </span>
            </Typography>
            <Typography sx={{ fontSize: 18 }}>{archive?.creator?.name}</Typography>
          </div>
        </Grid>
        <Grid item>
          <div style={{ flex: 2 }} className="creator">
            <Typography sx={{ fontSize: 15, fontWeight: 800, color: "#999", gap: 1 }} className="flex-items-center">
              <ArrowOutwardIcon sx={{ fontSize: 14 }} />
              <span> الموضوع </span>
            </Typography>
            <Typography sx={{ fontSize: 18 }}>{archive?.title}</Typography>
          </div>
        </Grid>
        <Grid item>
          <div style={{ flex: 2 }} className="creator">
            <Typography sx={{ fontSize: 15, fontWeight: 800, color: "#999", gap: 1 }} className="flex-items-center">
              <TransitEnterexitIcon sx={{ fontSize: 14 }} />
              <span> رقم الكتاب </span>
            </Typography>
            <Typography sx={{ fontSize: 18 }}>{archive?.issueNumber}</Typography>
          </div>
        </Grid>
        <Grid item>
          <div style={{ flex: 2 }} className="creator">
            <Typography sx={{ fontSize: 15, fontWeight: 800, color: "#999", gap: 1 }} className="flex-items-center">
              <TransitEnterexitIcon sx={{ fontSize: 14 }} />
              <span> التاريخ </span>
            </Typography>
            <Typography sx={{ fontSize: 18 }}>{dayjs(archive?.date).format("DD-MM-YYYY")}</Typography>
          </div>
        </Grid>
        <Grid item>
          <div style={{ flex: 2 }} className="creator">
            <Typography sx={{ fontSize: 15, fontWeight: 800, color: "#999", gap: 1 }} className="flex-items-center">
              <TransitEnterexitIcon sx={{ fontSize: 14 }} />
              <span> رقم المحضر </span>
            </Typography>
            <Typography sx={{ fontSize: 18 }}>{archive?.m7derNumber}</Typography>
          </div>
        </Grid>
        <Grid item>
          <div style={{ flex: 2 }} className="creator">
            <Typography sx={{ fontSize: 15, fontWeight: 800, color: "#999", gap: 1 }} className="flex-items-center">
              <TransitEnterexitIcon sx={{ fontSize: 14 }} />
              <span> سنة التخصص </span>
            </Typography>
            <Typography sx={{ fontSize: 18 }}>{archive?.specializationYear}</Typography>
          </div>
        </Grid>
        <Grid item>
          <div style={{ flex: 2 }} className="creator">
            <Typography sx={{ fontSize: 15, fontWeight: 800, color: "#999", gap: 1 }} className="flex-items-center">
              <TransitEnterexitIcon sx={{ fontSize: 14 }} />
              <span> رقم القطعة </span>
            </Typography>
            <Typography sx={{ fontSize: 18 }}>{archive?.partNumber}</Typography>
          </div>
        </Grid>
        <Grid item>
          <div style={{ flex: 2 }} className="creator">
            <Typography sx={{ fontSize: 15, fontWeight: 800, color: "#999", gap: 1 }} className="flex-items-center">
              <TransitEnterexitIcon sx={{ fontSize: 14 }} />
              <span> رقم كتاب الترحيل </span>
            </Typography>
            <Typography sx={{ fontSize: 18 }}>{archive?.deportationBookNumber}</Typography>
          </div>
        </Grid>
      </Grid>
      {/* Files List */}
      <FilesList />

      {/* Dialogs */}
      <ArchiveDialog />
      <UniAlertDialog
        handleClose={alertHandleClose}
        handleConfirm={alertHandleConfirm}
        text={`هل تريد حذف الملف ${selectedItem?.item?.name}؟`}
      />
    </div>
  );
}

export default Archive;
