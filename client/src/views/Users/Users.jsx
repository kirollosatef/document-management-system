import UniTable from "@components/Common/UniversalTable/UniTable";
import { users } from "../../mockup/data";
function Users() {
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

  return (
    <div>
      <UniTable headers={headers} data={users} title="المستخدمين" />
    </div>
  );
}

export default Users;
