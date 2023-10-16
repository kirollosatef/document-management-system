import UniTable from "@components/Common/UniversalTable/UniTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import DepartmentDialog from "@components/Departments/DepartmentDialog/DepartmentDialog";
import {
  deleteDepartment,
  getDepartments,
} from "@store/departments/departmentActions";
import Loading from "@components/Common/Loading/Loading";
import {
  resetSelectedItem,
  resetToolbar,
  setPageName,
  setRemove,
  setSelectedItem,
} from "@store/toolsbar/toolsbarSlice";
import { toast } from "react-toastify";
import { reset } from "@store/departments/departmentsSlice";
import UniAlertDialog from "@components/Common/UniversalAlertDialog/UniAlertDialog";

function Departments() {
  const dispatch = useDispatch();
  const { allDepartments, loading, error, message, deleted } =
    useSelector((state) => state.departments);
  const { selectedItem } = useSelector((state) => state.toolsbar.components);

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
  // ------ Main Request --> Get Departments
  useEffect(() => {
    dispatch(getDepartments());
    dispatch(resetSelectedItem());
    dispatch(setPageName("departments"));
  }, [dispatch]);

  // ------ Select Item
  const handleClick = (obj) => {
    dispatch(setSelectedItem({ type: "department", item: obj }));
  };

  // ------ Update Dialog
  const alertHandleConfirm = () => {
    dispatch(deleteDepartment(selectedItem?.item?._id));
  };

  // ------ Remove Dialog
  const alertHandleClose = () => {
    dispatch(setRemove(false));
    dispatch(resetToolbar());
  };

  // ------ Remove Dialog --> 1. deleted successfully
  useEffect(() => {
    if (deleted) {
      toast.success("تم حذف القسم بنجاح");
      dispatch(setRemove(false));
      dispatch(reset());
      dispatch(resetSelectedItem());
    }
  }, [deleted]);

  // ------ Remove Dialog --> 2. The process failed
  useEffect(() => {
    if (error) {
      toast.error(message);
      dispatch(reset());
    }
  }, [error]);

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
      <DepartmentDialog />
      <UniAlertDialog
        handleClose={alertHandleClose}
        handleConfirm={alertHandleConfirm}
        text={`هل تريد حذف القسم ${selectedItem?.item?.name}؟`}
      />
    </div>
  );
}

export default Departments;
