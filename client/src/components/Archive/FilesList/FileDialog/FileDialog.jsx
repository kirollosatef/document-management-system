/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import UniInput from "@components/Common/UniversalInput/UniInput";
import {
  resetSelectedItem,
  setAdd,
  setUpdate,
} from "@store/toolsbar/toolsbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetToolbar } from "@store/toolsbar/toolsbarSlice";
import { toast } from "react-toastify";
import { createFile, updateFile } from "@store/folders/foldersActions";
import { AddAPhoto, LineWeight } from "@mui/icons-material";
import emptyImage from "@assets/emptyImage.webp";
import { reset } from "@store/folders/foldersSlice";
import dayjs from "dayjs";

export default function FileDialog({ open, setOpen, selectedFile }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { archiveDetails: rchv } = useSelector((state) => state.folders);
  const { add, update } = useSelector((state) => state.toolsbar);
  const { created, updated, actionsLoading } = useSelector(
    (state) => state.folders
  );
  const { selectedItem } = useSelector((state) => state.toolsbar.components);
  const handleClose = () => {
    setOpen(false);
  };

  // ======== Set the default values ========

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
            {rchv?.title}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <Grid container>
            <Grid item xs={12} md={6}>
              <Typography sx={{ fontSize: 20, fontWeight: 500 }}>
                {rchv?.description}
              </Typography>
              <Box
                mt={2}
                sx={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <div>
                  <Typography sx={{ fontSize: 12, color: "#999" }}>
                    منشئ الارشيف
                  </Typography>
                  <Typography sx={{ fontSize: 12 }}>
                    {rchv.creator.name}
                  </Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: 12, color: "#999" }}>
                    الصلاحية
                  </Typography>
                  <Typography sx={{ fontSize: 12 }}>
                    {rchv.creator.role}
                  </Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: 12, color: "#999" }}>
                    المصدر
                  </Typography>
                  <Typography sx={{ fontSize: 12 }}>{rchv.exporter}</Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: 12, color: "#999" }}>
                    المستورد
                  </Typography>
                  <Typography sx={{ fontSize: 12 }}>{rchv.importer}</Typography>
                </div>
                <div>
                  <Typography sx={{ fontSize: 12, color: "#999" }}>
                    تاريخ الانشاء
                  </Typography>
                  <Typography sx={{ fontSize: 12 }}>
                    {dayjs(rchv.date).format("DD-MM-YYYY")}
                  </Typography>
                </div>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <img
                className="files-item-img flex-center"
                src={selectedFile}
                alt="img"
                width={"100%"}
                style={{ padding: "2rem" }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions dir="ltr">
          <Stack gap={2} direction="row" mx={4}>
            <Button
              variant="outlined"
              onClick={handleClose}
              className="btnFooter"
              color="error">
              غلق
            </Button>
            <Button type="submit" variant="outlined" disabled={actionsLoading}>
              طباعة
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}
