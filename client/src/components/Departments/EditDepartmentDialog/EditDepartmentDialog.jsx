import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import UniInput from "@components/Common/UniversalInput/UniInput";
import { setAdd } from "@store/toolsbar/toolsbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { createDepartment } from "@store/departments/departmentActions";
import { useEffect } from "react";
import { reset } from "@store/departments/departmentsSlice";
import { toast } from "react-toastify";

export default function AddDepartmentDialog({ open, setOpen, footer }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { created, error,message } = useSelector((state) => state.departments);
  const handleClose = () => {
    dispatch(setAdd(false));
    formik.resetForm()

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
      dispatch(createDepartment(values));
    },
  });
  useEffect(() => {
    if (created) {
      toast.success("تمت اضافة قسم جديد")
      dispatch(setAdd(false));
      dispatch(reset());
      formik.resetForm()
    }
    if (error) {
      toast.error(message);
      dispatch(reset());
    }
  }, [created,error]);
  return (
    <div>
      {/* <Button
        variant="contained"
        onClick={handleClickOpen}
        className="btnFooter"
      >اضافة</Button> */}
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">اضافة قسم</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            {/* <DialogContentText sx={{marginBottom:"2rem" }}> قم باضافة اسم القسم والوصف الخاص به </DialogContentText> */}

            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={2}
              marginBottom={2}>
              <UniInput
                name="name"
                label="اسم القسم"
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
              <Button type="submit" variant="outlined">
                اضافة
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
