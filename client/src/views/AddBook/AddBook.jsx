import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { setPageName } from "@store/toolsbar/toolsbarSlice";
import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Button, MenuItem, Select, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import UniInput from "@components/Common/UniversalInput/UniInput";
import { resetSelectedItem, setAdd, setUpdate } from "@store/toolsbar/toolsbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetToolbar } from "@store/toolsbar/toolsbarSlice";
import { toast } from "react-toastify";
import { createArchive, getFolders, updateArchive } from "@store/folders/foldersActions";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { reset } from "@store/folders/foldersSlice";
import UploadFiles from "@components/Folders/UploadFiles/UploadFiles";

function AddBook() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [selectedFiles, setSelectedFiles] = React.useState([]);
  const { add } = useSelector((state) => state.toolsbar);
  const { created, actionsLoading, folderDetails: folder } = useSelector((state) => state.folders);
  const { allFolders, error, message, loading, deleted } = useSelector((state) => state.folders);

  // State to keep track of the selected folder
  const [selectedFolder, setSelectedFolder] = React.useState(null);
  const [selectedSubFolder, setSelectedSubFolder] = React.useState(null);
  const [subFolders, setSubFolders] = React.useState([]);
  const [allFoldersData, setAllFoldersData] = React.useState([]);
  const [multiple, setMultiple] = React.useState(false);
  const [bookData, setBookData] = React.useState({});
  // Function to handle folder selection
  const handleFolderSelect = (event) => {
    const selectedFolderId = event.target.value;
    const selectedFolderObj = allFoldersData.find((folder) => folder._id === selectedFolderId);
    setSelectedFolder(selectedFolderObj);
    setSelectedSubFolder(null);
    setSubFolders(selectedFolderObj?.subFolders || []);
  };

  // Function to handle subfolder selection
  const handleSubfolderSelect = (event) => {
    const selectedSubfolderId = event.target.value;
    const selectedSubfolderObj = subFolders.find((folder) => folder._id === selectedSubfolderId);
    setSelectedSubFolder(selectedSubfolderObj);
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      date: "",
    },
    validationSchema: yup.object({
      title: yup.string().required("هذا الحقل مطلوب"),
      issueNumber: yup.string().required("هذا الحقل مطلوب"),
      date: yup.string().required("هذا الحقل مطلوب"),
    }),
    async onSubmit(values) {
      const formData = new FormData();
      for (const file of selectedFiles) {
        formData.append("files", file);
      }
      formData.append("title", formik.values.title);
      formData.append("issueNumber", formik.values.issueNumber);
      formData.append("date", formik.values.date);
      dispatch(createArchive({ data: formData, params: { folderId: selectedSubFolder?._id } }));
    },
  });

  useEffect(() => {
    console.log("🚀 ~ AddBook ~ folderDetails:", folder);
  }, [folder]);

  useEffect(() => {
    if (folder?.isRoot) {
      if (created) {
        toast.success("تم انشاء الارشيف بنجاح");
        dispatch(setAdd(false));
        dispatch(reset());
        dispatch(resetSelectedItem());
        formik.resetForm();
      }
    }
  }, [created]);

  useEffect(() => {
    dispatch(setPageName("addBook"));
    dispatch(getFolders());
  }, [dispatch]);

  useEffect(() => {
    setAllFoldersData(allFolders);
  }, [allFolders]);

  return (
    <>
      <div style={{ width: "50%" }}>
        <DialogTitle
          id="responsive-dialog-title"
          style={{
            marginBottom: "20px",
          }}
        >
          اضافة كتاب
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <Box display={"flex"} flexDirection={"column"} gap={2} marginBottom={2}>
            <UniInput
              name="title"
              label="الموضوع"
              value={formik.values.title}
              error={Boolean(formik.errors.title)}
              onChange={formik.handleChange}
              helperText={formik.errors.title}
            />
            <UniInput
              name="issueNumber"
              label="رقم الكتاب"
              value={formik.values.issueNumber}
              error={Boolean(formik.errors.issueNumber)}
              onChange={formik.handleChange}
              helperText={formik.errors.issueNumber}
            />
            <DatePicker
              label="التاريخ"
              value={formik.values.date ? dayjs(formik.values.date) : null}
              onChange={(value) => formik.setFieldValue("date", value)}
            />
            <Select value={selectedFolder?._id || ""} onChange={handleFolderSelect}>
              {allFoldersData?.map((folder) => (
                <MenuItem key={folder._id} value={folder._id}>
                  {folder.name}
                </MenuItem>
              ))}
            </Select>
            {selectedFolder && (
              <Select value={selectedSubFolder?._id || ""} onChange={handleSubfolderSelect}>
                {subFolders?.map((subfolder) => (
                  <MenuItem key={subfolder._id} value={subfolder._id}>
                    {subfolder.name}
                  </MenuItem>
                ))}
              </Select>
            )}
            <UploadFiles
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
              setMultiple={setMultiple}
              multiple={multiple}
              title="رفع اكثر من صورة"
            />{" "}
          </Box>
          <Stack
            gap={2}
            direction="row"
            mx={4}
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              variant="outlined"
              disabled={false}
              style={{
                width: "25%",
              }}
            >
              اضافة
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
}

export default AddBook;
