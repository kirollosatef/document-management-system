import UniTable from "@components/Common/UniversalTable/UniTable";
// import { users } from "../../mockup/data";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  resetSelectedItem,
  resetToolbar,
  setRemove,
  setSelectedItem,
} from "@store/toolsbar/toolsbarSlice";
import { deleteUser, getUsers } from "@store/users/usersActions";
import Loading from "@components/Common/Loading/Loading";
import { Grid } from "@mui/material";
import UsersDialog from "@components/Users/UsersDialog/UsersDialog";
import UniAlertDialog from "@components/Common/UniversalAlertDialog/UniAlertDialog";

function Users() {
  const dispatch = useDispatch();
  const { allUsers, loading } = useSelector((state) => state.users);
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
  const handleClick = (obj) => {
    // dispatch(reset());
    dispatch(setSelectedItem({ type: "user", item: obj }));
  };
  useEffect(() => {
    dispatch(getUsers());
    // dispatch(resetToolbar())
    dispatch(resetSelectedItem());
  }, [dispatch]);
  const alertHandleConfirm = () => {
    dispatch(deleteUser(selectedItem?.item?._id));
  };

  const alertHandleClose = () => {
    dispatch(setRemove(false));
    dispatch(resetToolbar());
  };
  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <Grid container>
          <Grid xs={12} sx={{ overflowX: "auto" }}>
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
