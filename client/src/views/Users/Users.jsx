import UniTable from "@components/Common/UniversalTable/UniTable";
import { users } from "../../mockup/data";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "@store/users/usersSlice";
function Users() {
  const dispatch = useDispatch();
  const headers = [
    { id: "id", label: "ID" },
    { id: "fullName", label: "الاسم الكامل" },
    {
      id: "username",
      label: "اسم المستخدم",
    },
    {
      id: "password",
      label: "كلمة المرور",
    },
    {
      id: "department",
      label: "القسم",
    },
    { id: "addedAt", label: "تاريخ الاضافة" },
  ];
  const handleClick = (user) => {
    dispatch(setSelectedUser(user));
  };
  return (
    <div>
      <UniTable
        headers={headers}
        data={users}
        title="المستخدمين"
        handleClick={handleClick}
      />
    </div>
  );
}

export default Users;
