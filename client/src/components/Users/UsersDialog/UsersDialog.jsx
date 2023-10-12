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
import { reset } from "@store/users/usersSlice";
import { toast } from "react-toastify";
import { createUser, updateUser } from "@store/users/usersActions";
import { getDepartments } from "@store/departments/departmentActions";
import UniversalSelect from "@components/Common/UniversalSelect/UniversalSelect";

export default function UsersDialog({ open, setOpen, footer }) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const { add, update } = useSelector((state) => state.toolsbar);
  const { created, error, message, components, updated, actionsLoading } =
    useSelector((state) => state.users);
  const { allDepartments } = useSelector((state) => state.departments);

  const { selectedItem } = useSelector((state) => state.toolsbar.components);
  // ------ Select options
  const options = [
    {
      name: "superadmin",
      label: "ادمن",
    },
    {
      name: "editor",
      label: "محرر",
    },
    {
      name: "viewer",
      label: "مشاهد",
    },
  ];
  const departmentsOptions = allDepartments?.map((item) => {
    return { name: item.name, label: item.name };
  });
  // ------ Formik & Yup
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      password: "",
      role: "",
      department: "",
    },
    validationSchema: yup.object({
      name: yup.string().required("هذا الحقل مطلوب"),
      username: yup.string().required("هذا الحقل مطلوب"),
      password: yup.string().required("هذا الحقل مطلوب"),
      role: yup.string().required("هذا الحقل مطلوب"),
      department: yup.string().required("هذا الحقل مطلوب"),
    }),
    onSubmit(values) {
      console.log({ values });
      add && dispatch(createUser(values));
      update &&
        dispatch(
          updateUser({
            data: values,
            params: { id: selectedItem?.item?._id },
          })
        );
    },
  });
  // ------ Functionalities
  const handleClose = () => {
    add ? dispatch(setAdd(false)) : dispatch(setUpdate(false));
    formik.resetForm();
    dispatch(resetToolbar());
  };
  useEffect(() => {
    if (created) {
      toast.success("تمت اضافة مستخدم جديد");
      dispatch(setAdd(false));
      dispatch(reset());
      dispatch(resetSelectedItem());
      formik.resetForm();
    }
    if (updated) {
      toast.success(`تم تعديل بيانات المستخدم ${selectedItem?.item?.name}`);
      dispatch(setUpdate(false));
      dispatch(reset());
      dispatch(resetSelectedItem());
      formik.resetForm();
    }
    if (error) {
      toast.error(message);
      dispatch(reset());
    }
  }, [created, updated, error]);

  useEffect(() => {
    if (update) {
      const { name, username, password, role, department } = selectedItem.item;
      formik.setFieldValue("name", name);
      formik.setFieldValue("username", username);
      formik.setFieldValue("password", password);
      formik.setFieldValue("role", role);
      formik.setFieldValue("department", department.name);
    }
  }, [update]);

  useEffect(() => {
    if (add || update) {
      if (!allDepartments) {
        dispatch(getDepartments());
      }
    }
  }, [add, update]);

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
            ? "اضافة مستخدم"
            : update
            ? `تعديل بيانات المستخدم ${selectedItem?.item?.name}`
            : ""}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            {/* <DialogContentText sx={{marginBottom:"2rem" }}> قم باضافة اسم القسم والوصف الخاص به </DialogContentText> */}

            <Box
              display={"flex"}
              flexDirection={"column"}
              gap={6}
              marginBottom={2}>
              <UniInput
                name="name"
                label="الاسم"
                value={formik.values.name}
                error={Boolean(formik.errors.name)}
                onChange={formik.handleChange}
                helperText={formik.errors.name}
              />
              <UniInput
                name="username"
                label="اسم المستخدم"
                value={formik.values.username}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.username)}
                helperText={formik.errors.username}
              />
              <UniInput
                name="password"
                label="كلمة المرور"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={Boolean(formik.errors.password)}
                helperText={formik.errors.password}
              />
              <UniversalSelect
                name="department"
                title="القسم"
                value={formik.values.department}
                formik={formik}
                options={departmentsOptions}
              />
              <UniversalSelect
                name="role"
                title="صلاحية الوصول"
                value={formik.values.role}
                formik={formik}
                options={options}
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
