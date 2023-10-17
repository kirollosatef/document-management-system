import { Menu } from "@mui/icons-material";
import { Button, Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import PrintIcon from "@mui/icons-material/Print";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import {
  setAdd,
  setOpen,
  setRemove,
  setUpdate,
} from "@store/toolsbar/toolsbarSlice";
import { useDispatch, useSelector } from "react-redux";
import AdsClickIcon from "@mui/icons-material/AdsClick";

function Toolbar({ setOpenSidebar }) {
  const dispatch = useDispatch();
  const { selectedItem, pageName } = useSelector(
    (state) => state.toolsbar.components
  );
  // For Open Btn
  const openBtnItems = ["archive", "folder"];
  const showOpenBtnPages = ["folderDetails", "folders"];
  // For Print Btn
  const handlePrintClick = () => {
    window.print();
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
            width={"100%"}>
            {showOpenBtnPages.includes(pageName) && (
              <Button
                variant="contained"
                color="info"
                endIcon={<AdsClickIcon />}
                sx={{ fontWeight: 600, fontSize: 12 }}
                dir="ltr"
                onClick={() => dispatch(setOpen(true))}
                disabled={!openBtnItems.includes(selectedItem.type)}>
                فتح
              </Button>
            )}
            <Button
              variant="outlined"
              color="success"
              endIcon={<AddIcon />}
              sx={{ fontWeight: 600, fontSize: 12 }}
              dir="ltr"
              onClick={() => dispatch(setAdd(true))}>
              اضافة
            </Button>
            <Button
              variant="outlined"
              color="warning"
              endIcon={<EditIcon />}
              sx={{ fontWeight: 600, fontSize: 12 }}
              dir="ltr"
              onClick={() => dispatch(setUpdate(true))}
              disabled={!selectedItem?.item?._id}>
              تعديل
            </Button>
            <Button
              variant="outlined"
              color="error"
              endIcon={<DeleteForeverIcon />}
              sx={{ fontWeight: 600, fontSize: 12 }}
              dir="ltr"
              onClick={() => dispatch(setRemove(true))}
              disabled={!selectedItem?.item?._id}>
              حذف
            </Button>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<PrintIcon />}
              sx={{ fontWeight: 600, fontSize: 12 }}
              dir="ltr"
              onClick={handlePrintClick}>
              طباعة
            </Button>
            <Button
              variant="contained"
              color="info"
              endIcon={<TextSnippetIcon />}
              sx={{ fontWeight: 600, fontSize: 12 }}
              dir="ltr"
              disabled>
              تعيين بيانات
            </Button>
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
