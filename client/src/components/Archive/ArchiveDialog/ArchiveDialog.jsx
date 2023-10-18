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
import {
  createDepartment,
  updateDepartment,
} from "@store/departments/departmentActions";
import { useEffect } from "react";
import { resetToolbar } from "@store/toolsbar/toolsbarSlice";
import { reset } from "@store/departments/departmentsSlice";
import { toast } from "react-toastify";
import { createFolder, updateFolder } from "@store/folders/foldersActions";

export default function ArchiveDialog({ open, setOpen, footer }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { add, update } = useSelector((state) => state.toolsbar);
  const { created, updated, actionsLoading } = useSelector(
    (state) => state.folders
  );
  const { selectedItem } = useSelector((state) => state.toolsbar.components);
  const handleClose = () => {
    add ? dispatch(setAdd(false)) : dispatch(setUpdate(false));
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
      add && dispatch(createFolder(values));
      update &&
        dispatch(
          updateFolder({
            data: values,
            params: { id: selectedItem?.item?._id },
          })
        );
    },
  });
  useEffect(() => {
    if (created) {
      toast.success("تمت اضافة ملف جديد");
      dispatch(setAdd(false));
      dispatch(reset());
      dispatch(resetSelectedItem());
      formik.resetForm();
    }
    if (updated) {
      toast.success(`تم تعديل ملف ${selectedItem?.item?.name}`);
      dispatch(setUpdate(false));
      dispatch(reset());
      dispatch(resetSelectedItem());
      formik.resetForm();
    }
  }, [created, updated]);

  // ======== Set the default values ========
  useEffect(() => {
    if (update) {
      const { name, description } = selectedItem.item;
      formik.setFieldValue("name", name);
      formik.setFieldValue("description", description);
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
            ? "اضافة ملف"
            : update
            ? `تعديل ملف ${selectedItem?.item?.name}`
            : ""}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            {/* <DialogContentText sx={{marginBottom:"2rem" }}> قم باضافة اسم الملف والوصف الخاص به </DialogContentText> */}

            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              marginBottom={2}>
              <UniInput
                name="name"
                label="اسم الملف"
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
                {add ? "اضافة" : update ? "تعديل" : ""}
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
