import UniTable from "@components/Common/UniversalTable/UniTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  reset,
} from "@store/departments/departmentsSlice";
import AddDepartmentDialog from "@components/Departments/AddDepartmentDialog/AddDepartmentDialog";
import { getDepartments } from "@store/departments/departmentActions";
import Loading from "@components/Common/Loading/Loading";
import { setSelectedItem } from "@store/toolsbar/toolsbarSlice";

function Departments() {
  const dispatch = useDispatch();
  const { allDepartments, components, loading } = useSelector(
    (state) => state.departments
  );
  const { selectedItem  } = useSelector(
    (state) => state.toolsbar.components
  );
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
    // dispatch(reset());
    dispatch(setSelectedItem({ type: "department", item: obj }));
    
  };
  useEffect(() => {
    dispatch(getDepartments());
  }, [dispatch]);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <UniTable
          headers={headers}
          data={allDepartments || []}
          title="الاقسام"
          handleClick={handleClick}
          selectedItem={selectedItem?.item}
        />
      )}
      <AddDepartmentDialog />
    </div>
  );
}

export default Departments;
