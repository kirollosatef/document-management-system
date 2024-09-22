import { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { deleteFile } from "@store/folders/foldersActions";
import UniAlertDialog from "@components/Common/UniversalAlertDialog/UniAlertDialog";
import { resetToolbar, setRemove } from "@store/toolsbar/toolsbarSlice";

export default function FileDialog({ open, setOpen, selectedFile }) {
  const fileRef = useRef(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { archiveDetails: rchv } = useSelector((state) => state.folders);
  const { actionsLoading } = useSelector((state) => state.folders);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const alertHandleClose = () => {
    dispatch(setRemove(false));
    dispatch(resetToolbar());
    setOpen(false);
  };

  const alertHandleConfirm = () => {
    dispatch(deleteFile(selectedFile.split("/").pop())).then(() => {
      dispatch(setRemove(false));
      setOpen(false);
    });
  };

  const handlePrint = () => {
    if (fileRef.current && selectedFile) {
      if (typeof selectedFile === 'string' && selectedFile.toLowerCase().endsWith('.pdf')) {
        // For PDF files, open in a new tab for printing
        const pdfWindow = window.open(selectedFile);
        pdfWindow.onload = () => {
          pdfWindow.print();
        };
      } else {
        // For images, use the existing print logic
        const printWindow = window.open("", "", "width=600, height=600");
        printWindow.document.write("<html><head><title>Print</title></head><body>");
        printWindow.document.write('<img src="' + fileRef.current.src + '" style="width:100%;"/>');
        printWindow.document.write("</body></html>");
        printWindow.document.close();
        printWindow.onload = () => {
          printWindow.print();
          printWindow.onafterprint = () => {
            printWindow.close();
          };
        };
      }
    }
  };

  const renderFilePreview = () => {
    if (!selectedFile) {
      return <Typography>No file selected</Typography>;
    }

    if (typeof selectedFile === 'string' && selectedFile.toLowerCase().endsWith('.pdf')) {
      return (
        <iframe
          src={selectedFile}
          width="100%"
          height="500px"
          title="PDF Preview"
          ref={fileRef}
        />
      );
    } else {
      return (
        <img
          className="files-item-img flex-center"
          src={selectedFile}
          ref={fileRef}
          alt="File preview"
          width={"100%"}
          style={{ padding: "1rem" }}
        />
      );
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <Typography sx={{ fontSize: 30, fontWeight: 700 }}>{rchv?.title || 'File Preview'}</Typography>
        </DialogTitle>

        <DialogContent>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{rchv?.description}</Typography>
              <Box mt={2} sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div>
                  <Typography sx={{ fontSize: 18, color: "#999" }}>منشئ الارشيف</Typography>
                  <Typography sx={{ fontSize: 16 }}>{rchv?.creator?.name}</Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: 18, color: "#999" }}>الصلاحية</Typography>
                  <Typography sx={{ fontSize: 16 }}>{rchv?.creator?.role}</Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: 18, color: "#999" }}>الموضوع</Typography>
                  <Typography sx={{ fontSize: 16 }}>{rchv?.title}</Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: 18, color: "#999" }}>رقم الكتاب</Typography>
                  <Typography sx={{ fontSize: 16 }}>{rchv?.issueNumber}</Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: 18, color: "#999" }}>تاريخ الانشاء</Typography>
                  <Typography sx={{ fontSize: 16 }}>{rchv?.date ? dayjs(rchv.date).format("DD-MM-YYYY") : 'N/A'}</Typography>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              {renderFilePreview()}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions dir="ltr">
          <Stack gap={2} direction="row" mx={4}>
            <Button variant="contained" onClick={
              () => {
                dispatch(setRemove(true));
                setOpen(false);
              }
            } className="btnFooter" color="error">
              حذف
            </Button>
            <Button variant="outlined" onClick={handleClose} className="btnFooter" color="error">
              غلق
            </Button>
            <Button type="submit" variant="outlined" disabled={actionsLoading || !selectedFile} onClick={handlePrint}>
              طباعة
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
      <UniAlertDialog
        handleClose={alertHandleClose}
        handleConfirm={alertHandleConfirm}
        text={`هل تريد حذف الملف ${selectedFile?.split("/").pop()}؟`}
      />
    </div>
  );
}
