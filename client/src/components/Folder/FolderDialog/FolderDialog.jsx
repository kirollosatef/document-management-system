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
  const [multiple, setMultiple] = React.useState(false);
  const formik = useFormik({
    initialValues: {
      title: "",
      issueNumber: "",
      date: "",
      m7derNumber: "",
      specializationYear: "",
      partNumber: "",
      deportationBookNumber: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("هذا الحقل مطلوب"),
      issueNumber: yup.string().required("هذا الحقل مطلوب"),
      date: yup.string().required("هذا الحقل مطلوب"),
      m7derNumber: yup.string().required("هذا الحقل مطلوب"),
      specializationYear: yup.string().required("هذا الحقل مطلوب"),
      partNumber: yup.number().required("هذا الحقل مطلوب").positive().integer(),
      deportationBookNumber: yup.string().required("هذا الحقل مطلوب"),
    }),
    onSubmit(values) {
      const formData = new FormData();
      for (const file of selectedFiles) {
        formData.append("files", file);
      }
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });
      
      add && dispatch(createArchive({ data: formData, params: { folderId: folder?._id } }));
      update && dispatch(updateArchive({ data: { ...values, folderId: folder?._id }, params: { id: selectedItem?.item?._id } }));
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
        // description,
        // exporter,
        // importer,
        creator,
        issueNumber,
        date,
      } = selectedItem.item;
      formik.setFieldValue("title", title);
      // formik.setFieldValue("description", description);
      // formik.setFieldValue("exporter", exporter);
      // formik.setFieldValue("importer", importer);
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
          {add ? "اضافة ارشيف" : update ? `تعديل ارشيف ${selectedItem?.item?.title}` : ""}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Box display={"flex"} flexDirection={"column"} gap={2} marginBottom={2}>
              <UniInput
                name="title"
                label="الموضوع"
                value={formik.values.title}
                error={Boolean(formik.errors.title)}
                onChange={formik.handleChange}
                helperText={formik.errors.title}
              />
              <UniInput
                name="issueNumber"
                label="رقم الكتاب"
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
              <UniInput
                name="m7derNumber"
                label="رقم المحضر"
                value={formik.values.m7derNumber}
                error={Boolean(formik.errors.m7derNumber)}
                onChange={formik.handleChange}
                helperText={formik.errors.m7derNumber}
              />
              <UniInput
                name="specializationYear"
                label="سنة التخصص"
                value={formik.values.specializationYear}
                error={Boolean(formik.errors.specializationYear)}
                onChange={formik.handleChange}
                helperText={formik.errors.specializationYear}
              />
              <UniInput
                name="partNumber"
                label="رقم القطعة"
                type="number"
                value={formik.values.partNumber}
                error={Boolean(formik.errors.partNumber)}
                onChange={formik.handleChange}
                helperText={formik.errors.partNumber}
              />
              <UniInput
                name="deportationBookNumber"
                label="رقم كتاب الترحيل"
                value={formik.values.deportationBookNumber}
                error={Boolean(formik.errors.deportationBookNumber)}
                onChange={formik.handleChange}
                helperText={formik.errors.deportationBookNumber}
              />
            </Box>
            {add && (
              <UploadFiles
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                setMultiple={setMultiple}
                multiple={multiple}
                title="رفع اكثر من صورة"
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
