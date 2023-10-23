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
  setAddSubfolder,
  setUpdate,
} from "@store/toolsbar/toolsbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetToolbar } from "@store/toolsbar/toolsbarSlice";
import { toast } from "react-toastify";
import {
  createArchive,
  createSubFolder,
  updateArchive,
} from "@store/folders/foldersActions";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { reset } from "@store/folders/foldersSlice";

export default function SubFolderDialog() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { addSubfolder, update } = useSelector((state) => state.toolsbar);
  const {
    created,
    updated,
    actionsLoading,
    folderDetails: folder,
  } = useSelector((state) => state.folders);
  const { selectedItem } = useSelector((state) => state.toolsbar.components);
  const handleClose = () => {
    dispatch(setAddSubfolder(false));
    formik.resetForm();
    dispatch(resetToolbar());
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("هذا الحقل مطلوب"),
      description: yup.string().required("هذا الحقل مطلوب"),
    }),
    onSubmit(values) {
      dispatch(
        createSubFolder({ data: values, params: { folderId: folder?._id } })
      );
    },
  });
  useEffect(() => {
    if (!folder?.isRoot) {
      if (created) {
        toast.success("تم انشاء المجلد الفرعي بنجاح");
        dispatch(setAddSubfolder(false));
        dispatch(reset());
        dispatch(resetSelectedItem());
        formik.resetForm();
      }
    }
  }, [created]);
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={addSubfolder}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">اضافة مجلد فرعي</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              marginBottom={2}>
              <UniInput
                name="name"
                label="اسم المجلد الفرعي"
                value={formik.values.name}
                error={Boolean(formik.errors.name)}
                onChange={formik.handleChange}
                helperText={formik.errors.name}
              />
              <UniInput
                name="description"
                label="الوصف"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.description)}
                helperText={formik.errors.description}
              />
            </Box>
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
                {"اضافة"}
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
