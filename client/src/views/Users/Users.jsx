import UniTable from "@components/Common/UniversalTable/UniTable";
// import { users } from "../../mockup/data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  resetSelectedItem,
  resetToolbar,
  setPageName,
  setRemove,
  setSelectedItem,
} from "@store/toolsbar/toolsbarSlice";
import { deleteUser, getUsers } from "@store/users/usersActions";
import Loading from "@components/Common/Loading/Loading";
import { Grid } from "@mui/material";
import UsersDialog from "@components/Users/UsersDialog/UsersDialog";
import UniAlertDialog from "@components/Common/UniversalAlertDialog/UniAlertDialog";
import { toast } from "react-toastify";
import { reset } from "@store/users/usersSlice";

function Users() {
  const dispatch = useDispatch();
  const { allUsers, loading, error, message, deleted } = useSelector(
    (state) => state.users
  );
  const { selectedItem } = useSelector((state) => state.toolsbar.components);
  const headers = [
    { id: "_id", label: "ID" },
    { id: "name", label: "الاسم" },
    {
      id: "username",
      label: "اسم المستخدم",
    },
    {
      id: "password",
      label: "كلمة المرور",
    },
    // {
    //   id: "department",
    //   label: "القسم",
    // },
    // { id: "addedAt", label: "تاريخ الاضافة" },
  ];
  //  ========== Actions ==========
  const handleClick = (obj) => {
    dispatch(setSelectedItem({ type: "user", item: obj }));
  };
  const alertHandleClose = () => {
    dispatch(setRemove(false));
    dispatch(resetToolbar());
  };
  const alertHandleConfirm = () => {
    dispatch(deleteUser(selectedItem?.item?._id));
  };

  //  ========== Fetch Data ==========
  useEffect(() => {
    dispatch(getUsers());
    dispatch(resetSelectedItem());
    dispatch(setPageName("users"));
  }, [dispatch]);
  //  ========== Displaying Any Error  ==========
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(reset());
    }
    if (deleted) {
      toast.success("تم حذف المستخدم بنجاح");
      dispatch(reset());
      dispatch(resetToolbar());

    }
  }, [error, deleted]);
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Grid container>
          <Grid item xs={12} sx={{ overflow: "hidden" }}>
            <UniTable
              headers={headers}
              data={allUsers || []}
              title="المستخدمين"
              handleClick={handleClick}
              selectedItem={selectedItem?.item}
            />
          </Grid>
        </Grid>
      )}
      <UsersDialog />
      <UniAlertDialog
        handleClose={alertHandleClose}
        handleConfirm={alertHandleConfirm}
        text={`هل تريد حذف الـمستخدم ${selectedItem?.item?.username}؟`}
      />
    </div>
  );
}

export default Users;
