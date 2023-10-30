/* eslint-disable no-extra-boolean-cast */
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Box, Button, Stack } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import UniInput from "@components/Common/UniversalInput/UniInput";
import {
  resetSelectedItem,
  setAdd,
  setUpdate,
} from "@store/toolsbar/toolsbarSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { resetToolbar } from "@store/toolsbar/toolsbarSlice";
import { toast } from "react-toastify";
import {
  createFile,
  createMultipleFiles,
  updateFile,
} from "@store/folders/foldersActions";
import { AddAPhoto } from "@mui/icons-material";
import emptyImage from "@assets/emptyImage.webp";
import { reset } from "@store/folders/foldersSlice";
import UploadFiles from "@components/Folders/UploadFiles/UploadFiles";

export default function ArchiveDialog() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [multiple, setMultiple] = useState(false);

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [tempPhoto, setTempPhoto] = useState("");
  const { archiveDetails } = useSelector((state) => state.folders);
  const { add, update } = useSelector((state) => state.toolsbar);
  const { created, updated, actionsLoading } = useSelector(
    (state) => state.folders
  );
  const { selectedItem } = useSelector((state) => state.toolsbar.components);
  const handleClose = () => {
    add ? dispatch(setAdd(false)) : dispatch(setUpdate(false));
    formik.resetForm();
    setMultiple(false);
    dispatch(resetToolbar());
  };
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: yup.object({
      name: multiple ? yup.string() : yup.string().required("هذا الحقل مطلوب"),
    }),
    onSubmit(values) {
      const actionData = {
        params: { archiveId: archiveDetails?._id },
        data: add ? { tempPhoto, name: values.name } : { tempPhoto },
      };
      if (multiple) {
        const formData = new FormData();
        for (const file of selectedFiles) {
          formData.append("files", file);
        }
        dispatch(
          createMultipleFiles({
            data: formData,
            params: { archiveId: archiveDetails?._id },
          })
        );
      } else {
        add && dispatch(createFile(actionData));
        update &&
          dispatch(
            updateFile({
              data: values,
              params: { id: selectedItem?.item?._id },
            })
          );
      }
    },
  });
  useEffect(() => {
    if (created) {
      toast.success("تمت اضافة ملف جديد");
      dispatch(setAdd(false));
      dispatch(reset());
      dispatch(resetSelectedItem());
      setMultiple(false);
      formik.resetForm();
    }
    if (updated) {
      toast.success(`تم تعديل ملف ${selectedItem?.item?.name}`);
      dispatch(setUpdate(false));
      dispatch(reset());
      dispatch(resetSelectedItem());
      formik.resetForm();
    }
  }, [created, updated]);

  // ======== Set the default values ========
  useEffect(() => {
    if (update) {
      const { name, description } = selectedItem.item;
      formik.setFieldValue("name", name);
      formik.setFieldValue("description", description);
    }
  }, [update]);

  const onImageChange = (e) => {
    if (e.target.files.length <= 0) {
      return false;
    }
    const file = e.target.files[0];
    const validExtension = new RegExp("^image/(jpeg|png|jpg)$", "ig").test(
      file.type
    );
    const validSize = file.size <= 512 * 1024;
    if (!validExtension || !validSize) {
      formik.setFieldError("photo", "Invalid image size or formal");
      return false;
    } else {
      formik.setFieldError("photo", null);
    }
    const url = URL.createObjectURL(file);
    document.getElementById("photo").src = url;
    setTempPhoto(file);
  };
  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={add || update}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">
          {add
            ? "اضافة ملف"
            : update
            ? `تعديل ملف ${selectedItem?.item?.name}`
            : ""}
        </DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            {add && (
              <UploadFiles
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                setMultiple={setMultiple}
                multiple={multiple}
                title="رفع اكثر من صورة"
              />
            )}
            {multiple ? (
              <></>
            ) : (
              <>
                <Box
                  display={"flex"}
                  flexDirection={"column"}
                  gap={2}
                  marginBottom={2}>
                  <UniInput
                    name="name"
                    label="اسم الملف"
                    value={formik.values.name}
                    error={Boolean(formik.errors.name)}
                    onChange={formik.handleChange}
                    helperText={formik.errors.name}
                  />
                </Box>
                {add && (
                  <Box
                    component="div"
                    sx={{
                      width: "100%",
                      height: "100%",
                      border: `1px solid ${
                        !Boolean(formik.errors.image) ? `#dedede` : "red"
                      }`,
                      borderRadius: 3,
                      position: "relative",
                      p: 3,
                    }}>
                    <img
                      id="photo"
                      src={formik.values.photo || emptyImage}
                      style={{
                        height: "200px",
                        width: "100%",
                        objectFit: "contain",
                      }}
                    />
                    <label
                      style={{
                        position: "absolute",
                        top: 20,
                        left: 20,
                        color: "#dfdfdf",
                        cursor: "pointer",
                      }}>
                      <AddAPhoto fontSize="large" />
                      <input
                        multiple={false}
                        type="file"
                        accept="image/jpeg,image/jpg,image/png"
                        style={{ display: "none" }}
                        onChange={onImageChange}
                      />
                    </label>
                  </Box>
                )}
              </>
            )}
          </DialogContent>
          <DialogActions dir="ltr">
            <Stack gap={2} direction="row" mx={4}>
              <Button
                variant="outlined"
                onClick={handleClose}
                className="btnFooter"
                color="error">
                غلق
              </Button>
              <Button
                type="submit"
                variant="outlined"
                disabled={actionsLoading}>
                {add ? "اضافة" : update ? "تعديل" : ""}
              </Button>
            </Stack>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
