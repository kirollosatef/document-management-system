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
import { useDispatch } from "react-redux";

export default function AddDepartmentDialog({ open, setOpen, footer }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    dispatch(setAdd(false));
  };
  const formik = useFormik({
    initialValues: {},
    validationSchema: yup.object({
      name: yup.string().required("هذا الحقل مطلوب"),
      description: yup.string().required("هذا الحقل مطلوب"),
    }),
    onSubmit(values) {
      console.log("done");
    },
  });
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
        <DialogContent>
          {/* {text && <DialogContentText sx={{marginBottom:".5rem",color:"#fff" }}> {text} </DialogContentText>} */}
          <form onSubmit={formik.handleSubmit} className="login-box-form">
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
                type="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.description)}
                helperText={formik.errors.description}
              />
            </Box>
          </form>
        </DialogContent>
        <DialogActions>
          <Stack gap={2} direction="row">
            <Button
              variant="contained"
              onClick={handleClose}
              className="btnFooter"
              color="error">
              غلق
            </Button>
            <Button
              variant="contained"
              onClick={() => {}}
              className="btnFooter">
              تعديل
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}
