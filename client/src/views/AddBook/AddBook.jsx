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
import { Box, Button, MenuItem, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import UniInput from "@components/Common/UniversalInput/UniInput";
import { resetSelectedItem, setAdd, setUpdate } from "@store/toolsbar/toolsbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { resetToolbar } from "@store/toolsbar/toolsbarSlice";
import { toast } from "react-toastify";
import { createArchive, getFolders, updateArchive } from "@store/folders/foldersActions";
import Select from "react-select";
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

  const [selectedSubFolder, setSelectedSubFolder] = React.useState(null);
  const [allSubFoldersData, setAllSubFoldersData] = React.useState([]);
  const [multiple, setMultiple] = React.useState(false);

  let options = allSubFoldersData.map((folder) => ({
    value: folder._id,
    label: folder.name,
  }));

  const handleSubFolderChange = (e) => {
    const folder = allSubFoldersData.find((folder) => folder._id === e.value);
    setSelectedSubFolder({ value: folder._id, label: folder.name });
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
      dispatch(createArchive({ data: formData, params: { folderId: selectedSubFolder?.value } }));
    },
  });

  useEffect(() => {
    console.log("created", created);
    if (created) {
      toast.success("تم انشاء الارشيف بنجاح");
      dispatch(setAdd(false));
      dispatch(reset());
      dispatch(resetSelectedItem());
      navigation.navigate("/");
      formik.resetForm();
    }
  }, [created]);

  useEffect(() => {
    dispatch(setPageName("addBook"));
    dispatch(getFolders());
  }, [dispatch]);

  useEffect(() => {
    if (allFolders) {
      let allSubFolders = [];
      allFolders.forEach((folder) => {
        allSubFolders = [...allSubFolders, ...folder.subFolders];
      });
      setAllSubFoldersData(allSubFolders);
    }
  }, [allFolders]);

  return (
    <>
      <div style={{ width: "50%", marginTop: "195px", marginRight: "23%" }}>
        <DialogTitle
          id="responsive-dialog-title"
          style={{
            marginBottom: "20px",
            textAlign: "center",
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
              value={formik.values.date ? dayjs(formik.values.date) : null}
              onChange={(value) => formik.setFieldValue("date", value)}
            />
            <Select
              options={options}
              onChange={handleSubFolderChange}
              value={selectedSubFolder}
              placeholder="اختر المجلد"
              isRtl={true}
              isSearchable={true}
              styles={{
                borderRadius: "5px",
                border: "1px solid #ccc",
                padding: "5px",
                width: "100%",
              }}
            />
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
