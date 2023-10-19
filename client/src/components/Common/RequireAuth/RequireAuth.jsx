import { getUser, reset } from "@store/auth/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";

const RequireAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, notFound } = useSelector((state) => state.auth);
  const location = useLocation();
  useEffect(() => {
    dispatch(getUser());
  }, []);
  useEffect(() => {
    if (!user?._id) {
      navigate("/login");
      dispatch(reset());
    }
  }, [notFound]);

  return user ? (
    <>
      <Outlet />
    </>
  ) : (
    <>
      <Navigate to="/login" state={{ from: location }} replace />
    </>
  );
};

export default RequireAuth;
