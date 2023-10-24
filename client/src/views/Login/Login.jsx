import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Alert,
  Typography,
  useMediaQuery,
} from "@mui/material";
import "./Login.scss";
import { login, reset } from "@store/auth/authSlice";
import UniInput from "@components/Common/UniversalInput/UniInput";
import { toast } from "react-toastify";
import logo from "@assets/logo.png";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, user, message } = useSelector((state) => state.auth);
  const isMdScreen = useMediaQuery("(max-width: 992px)");
  const formik = useFormik({
    initialValues: {},
    validationSchema: yup.object({
      username: yup.string().required("هذا الحقل مطلوب"),
      password: yup.string().required("هذا الحقل مطلوب"),
    }),
    onSubmit(values) {
      dispatch(login(values));
    },
  });
  useEffect(() => {
    if (user?._id) {
      navigate("/");
    }
    if (error) {
      toast.error(message);
      dispatch(reset());
    }
  }, [user, error]);

  return (
    <div className="login">
      <div className="login-box">
        <div className="login-box-logo">
          <img src={logo} alt="logo" width={50} />
          <span>مديرية بلدية السماوة/شعبة الاملاك</span>
        </div>
        <form onSubmit={formik.handleSubmit} className="login-box-form">
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            marginBottom={2}>
            <UniInput
              name="username"
              label="اسم المستخدم"
              type="username"
              value={formik.values.username}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.username)}
              helperText={formik.errors.username}
            />
            <UniInput
              name="password"
              label="كلمة المرور"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.password)}
              helperText={formik.errors.password}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            تسجيل الدخول
          </Button>
        </form>
      </div>
      <div className="login-text">
        <Typography sx={{ fontSize: isMdScreen ? "1.7rem" : "2rem" }}>
          تسجيل الدخول للنظام
        </Typography>
        <Typography
          sx={{
            fontSize: isMdScreen ? "4.2rem" : "5rem",
            textAlign: "center",
            fontWeight: 900,
          }}>
          مديرية بلدية السماوة/شعبة الاملاك
        </Typography>
      </div>
    </div>
  );
}

export default Login;
