import { Button, Stack } from "@mui/material";
import { setAdd, setAddSubfolder } from "@store/toolsbar/toolsbarSlice";
import { useDispatch } from "react-redux";
import SubFolderDialog from "../SubFolderDialog/SubFolderDialog";
import { useState } from "react";

function EmptyFolder() {
  const dispatch = useDispatch();
  return (
    <>
      <Stack spacing={2}>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => dispatch(setAddSubfolder(true))}>
          انشاء مجلد فرعي
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => dispatch(setAdd(true))}>
          اضافة ارشيف
        </Button>
      </Stack>
    </>
  );
}

export default EmptyFolder;
