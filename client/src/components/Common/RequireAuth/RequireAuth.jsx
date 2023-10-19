import { useSelector } from "react-redux";
import { useLocation, Navigate, Outlet } from "react-router-dom";

const RequireAuth = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();
  const storedToken = localStorage.getItem("userToken");

  const tokenPayload = parseToken(storedToken);
  console.log({tokenPayload});
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
