import UniTable from "@components/Common/UniversalTable/UniTable";
import { users } from "../../mockup/data";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@store/users/usersSlice";
import { useEffect } from "react";
import {
  getDepartments,
  setSelectedDepartment,
} from "@store/departments/departmentsSlice";
function Departments() {
  const dispatch = useDispatch();
  const {allDepartments} = useSelector(state => state.departments)
  const headers = [
    { id: "_id", label: "ID" },
    { id: "name", label: "الاسم" },
    {
      id: "description",
      label: "الوصف",
    },
    // {
    //   id: "createdAt",
    //   label: "تاريخ الاضافة",
    // },
  ];
  const handleClick = (obj) => {
    dispatch(setSelectedDepartment(obj));
  };
  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);
  return (
    <div>
      <UniTable
        headers={headers}
        data={allDepartments || []}
        title="الاقسام"
        handleClick={handleClick}
      />
    </div>
  );
}

export default Departments;
