import UniTable from "@components/Common/UniversalTable/UniTable";
import { users } from "../../mockup/data";
import { useDispatch } from "react-redux";
import { setSelectedUser } from "@store/users/usersSlice";
import { useEffect } from "react";
import { getDepartments } from "@store/departments/departmentsSlice";
function Departments() {
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
  useEffect(() => {
    dispatch(getDepartments());
  }, []);
  return (
    <div>
      <UniTable
        headers={headers}
        data={users}
        title="الاقسام"
        handleClick={handleClick}
      />
    </div>
  );
}

export default Departments;
