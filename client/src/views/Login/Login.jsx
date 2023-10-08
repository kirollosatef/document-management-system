import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { Box, Button, TextField, Alert } from "@mui/material";
import "./Login.scss";
import { reset } from "@store/users/usersSlice";
import { login } from "@store/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { errors, errorMessage, user } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {},
    validationSchema: yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    }),
    onSubmit(values) {
      dispatch(login(values));
    },
  });
  useEffect(() => {
    dispatch(reset());
    if (user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="login">
      <div className="login-box">
        <div className="login-box-logo">logo</div>
        <div className="login-box-text">تسجيل الدخول للنظام</div>
        <form onSubmit={formik.handleSubmit} className="login-box-form">
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={2}
            marginBottom={2}>
            <TextField
              name="email"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.email)}
              helperText={formik.errors.email}
              sx={{
                "& .MuiInputLabel-root ": {
                  right: "25px",
                  left: "unset",
                },
                "& .MuiInputLabel-root.Mui-focused ": {
                  right: "19px",
                  left: "unset",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  textAlign:"right"
                },
                "& .MuiFormHelperText-root ": {
                  textAlign:"right"
                },
                "& .MuiOutlinedInput-root": {
                  outlineColor: "transparent",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7b2cbfff !important",
                },
                "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": {
                  color: "#7b2cbfff",
                },
              }}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={Boolean(formik.errors.password)}
              helperText={formik.errors.password}
              sx={{
                "& .MuiOutlinedInput-root": {
                  outlineColor: "transparent",
                },
                "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#7b2cbfff !important",
                },
                "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": {
                  color: "#7b2cbfff",
                },
              }}
            />
          </Box>
          <Button type="submit">Login</Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
