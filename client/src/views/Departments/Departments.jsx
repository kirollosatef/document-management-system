import UniTable from "@components/Common/UniversalTable/UniTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setSelectedDepartment,
} from "@store/departments/departmentsSlice";
import AddDepartmentDialog from "@components/Departments/AddDepartmentDialog/AddDepartmentDialog";
import { getDepartments } from "@store/departments/departmentActions";

function Departments() {
  const dispatch = useDispatch();
  const { allDepartments, components } = useSelector(
    (state) => state.departments
  );
  const { add } = useSelector(
    (state) => state.toolsbar
  );
  const { selectedDepartment } = components;
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
        selectedItem={selectedDepartment}
      />
      <AddDepartmentDialog open={add} />
    </div>
  );
}

export default Departments;
