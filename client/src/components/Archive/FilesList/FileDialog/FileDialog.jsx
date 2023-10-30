/* eslint-disable no-extra-boolean-cast */
import { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";

import { useSelector } from "react-redux";

import dayjs from "dayjs";

export default function FileDialog({ open, setOpen, selectedFile }) {
  const imgRef = useRef(null);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { archiveDetails: rchv } = useSelector((state) => state.folders);
  const { actionsLoading } = useSelector((state) => state.folders);
  const handleClose = () => {
    setOpen(false);
  };

  const handlePrint = () => {
    if (imgRef.current) {
      const printWindow = window.open("", "", "width=600, height=600");
      printWindow.document.write("<html><head><title>Print</title></head><body>");
      printWindow.document.write('<img src="' + imgRef.current.src + '" style="width:100%;"/>');
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.onload = () => {
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
        };
      };
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
          <Typography sx={{ fontSize: 30, fontWeight: 700 }}>{rchv?.title}</Typography>
        </DialogTitle>

        <DialogContent>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: 20, fontWeight: 500 }}>{rchv?.description}</Typography>
              <Box mt={2} sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div>
                  <Typography sx={{ fontSize: 12, color: "#999" }}>منشئ الارشيف</Typography>
                  <Typography sx={{ fontSize: 12 }}>{rchv?.creator?.name}</Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: 12, color: "#999" }}>الصلاحية</Typography>
                  <Typography sx={{ fontSize: 12 }}>{rchv?.creator?.role}</Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: 12, color: "#999" }}>اسم الشخص</Typography>
                  <Typography sx={{ fontSize: 12 }}>{rchv?.title}</Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: 12, color: "#999" }}>رقم القطعة</Typography>
                  <Typography sx={{ fontSize: 12 }}>{rchv?.issueNumber}</Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: 12, color: "#999" }}>تاريخ الانشاء</Typography>
                  <Typography sx={{ fontSize: 12 }}>{dayjs(rchv?.date).format("DD-MM-YYYY")}</Typography>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                className="files-item-img flex-center"
                src={selectedFile}
                ref={imgRef}
                alt="img"
                width={"100%"}
                style={{ padding: "2rem" }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions dir="ltr">
          <Stack gap={2} direction="row" mx={4}>
            <Button variant="outlined" onClick={handleClose} className="btnFooter" color="error">
              غلق
            </Button>
            <Button type="submit" variant="outlined" disabled={actionsLoading} onClick={handlePrint}>
              طباعة
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}
