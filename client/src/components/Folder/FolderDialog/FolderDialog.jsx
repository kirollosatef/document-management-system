import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Stack } from "@mui/material";
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
import { createArchive, updateArchive } from "@store/folders/foldersActions";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { reset } from "@store/folders/foldersSlice";
import UploadFiles from "@components/Folders/UploadFiles/UploadFiles";

export default function FolderDialog() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const { add, update } = useSelector((state) => state.toolsbar);
  const {
    created,
    updated,
    actionsLoading,
    folderDetails: folder,
  } = useSelector((state) => state.folders);
  const { selectedItem } = useSelector((state) => state.toolsbar.components);
  const handleClose = () => {
    add ? dispatch(setAdd(false)) : dispatch(setUpdate(false));
    formik.resetForm();
    dispatch(resetToolbar());
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      exporter: "",
      importer: "",
      date: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("هذا الحقل مطلوب"),
      description: yup.string().required("هذا الحقل مطلوب"),
      exporter: yup.string().required("هذا الحقل مطلوب"),
      importer: yup.string().required("هذا الحقل مطلوب"),
      issueNumber: yup.string().required("هذا الحقل مطلوب"),
      date: yup.string().required("هذا الحقل مطلوب"),
    }),
    onSubmit(values) {
      const formData = new FormData();
      for (const file of selectedFiles) {
        formData.append("files", file);
      }
      formData.append("title", formik.values.title);
      formData.append("description", formik.values.description);
      formData.append("exporter", formik.values.exporter);
      formData.append("importer", formik.values.importer);
      formData.append("issueNumber", formik.values.issueNumber);
      formData.append("date", formik.values.date);
      add &&
        dispatch(
          createArchive({ data: formData, params: { folderId: folder?._id } })
        );
      update &&
        dispatch(
          updateArchive({
            data: { ...values, folderId: folder?._id },
            params: { id: selectedItem?.item?._id },
          })
        );
    },
  });
  useEffect(() => {
    if (folder?.isRoot) {
      if (created) {
        toast.success("تم انشاء الارشيف بنجاح");
        dispatch(setAdd(false));
        dispatch(reset());
        dispatch(resetSelectedItem());
        formik.resetForm();
      }
      if (updated) {
        toast.success(`تم تعديل ارشيف ${selectedItem?.item?.title}`);
        dispatch(setUpdate(false));
        dispatch(reset());
        dispatch(resetSelectedItem());
        formik.resetForm();
      }
    }
  }, [created, updated]);

  // ======== Set the default values ========
  useEffect(() => {
    if (update) {
      const {
        title,
        description,
        exporter,
        importer,
        creator,
        issueNumber,
        date,
      } = selectedItem.item;
      formik.setFieldValue("title", title);
      formik.setFieldValue("description", description);
      formik.setFieldValue("exporter", exporter);
      formik.setFieldValue("importer", importer);
      formik.setFieldValue("creator", creator);
      formik.setFieldValue("issueNumber", issueNumber);
      formik.setFieldValue("date", date);
    }
  }, [update]);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={add || update}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {add
            ? "اضافة ارشيف"
            : update
            ? `تعديل ارشيف ${selectedItem?.item?.title}`
            : ""}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              marginBottom={2}>
              <UniInput
                name="title"
                label="اسم الارشيف"
                value={formik.values.title}
                error={Boolean(formik.errors.title)}
                onChange={formik.handleChange}
                helperText={formik.errors.title}
              />
              <UniInput
                name="description"
                label="الوصف"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.description)}
                helperText={formik.errors.description}
              />
              <UniInput
                name="exporter"
                label="المصدر"
                value={formik.values.exporter}
                error={Boolean(formik.errors.exporter)}
                onChange={formik.handleChange}
                helperText={formik.errors.exporter}
              />
              <UniInput
                name="importer"
                label="المستورد"
                value={formik.values.importer}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.importer)}
                helperText={formik.errors.importer}
              />
              <UniInput
                name="issueNumber"
                label="عدد الاصدار"
                value={formik.values.issueNumber}
                error={Boolean(formik.errors.issueNumber)}
                onChange={formik.handleChange}
                helperText={formik.errors.issueNumber}
              />
              <DatePicker
                label="التاريخ"
                value={formik.values.date ? dayjs(formik.values.date) : null}
                onChange={(value) => formik.setFieldValue("date", value)}
              />
            </Box>
            {add && (
              <UploadFiles
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
              />
            )}
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
              <Button
                type="submit"
                variant="outlined"
                disabled={actionsLoading}>
                {add ? "اضافة" : update ? "تعديل" : ""}
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
