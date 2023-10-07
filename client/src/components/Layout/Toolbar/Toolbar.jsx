import { Menu } from "@mui/icons-material";
import {  Button, Stack, useTheme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PrintIcon from "@mui/icons-material/Print";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";

function Toolbar({ setOpenSidebar }) {
  const theme = useTheme();

  const user = {
    name: "Mohammed",
    username: "محمد رمضان",
    avatar: "",
  };

  return (
    <div className="toolbar">
      <div className="toolbar-burger" onClick={() => setOpenSidebar(true)}>
        <Menu />
      </div>
      <div className="toolbar-content">
        <div className="toolbar-content-btns">
          <Stack
            direction="row"
            gap={2}
            alignItems={"center"}
            justifyContent={"center"}
            margin={"auto"}
            width={"100%"}
          >
            <Button
              variant="outlined"
              color="success"
              endIcon={<AddIcon />}
              sx={{fontWeight:600,fontSize:12}}
              dir="ltr"
            >
              اضافة
            </Button>
            <Button
              variant="outlined"
              color="warning"
              endIcon={<EditIcon />}
              sx={{fontWeight:600,fontSize:12}}
              dir="ltr"
            >
              تعديل
            </Button>
            <Button
              variant="outlined"
              color="error"
              endIcon={<DeleteForeverIcon />}
              sx={{fontWeight:600,fontSize:12}}
              dir="ltr"
            >
              حذف
            </Button>
            <Button
              variant="contained"
              color="info"
              endIcon={<PrintIcon />}
              sx={{fontWeight:600,fontSize:12}}
              dir="ltr"
            >
              طباعة
            </Button>
            <Button
              variant="contained"
              color="info"
              endIcon={<TextSnippetIcon />}
              sx={{fontWeight:600,fontSize:12}}
              dir="ltr"
            >
              تعيين بيانات
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
