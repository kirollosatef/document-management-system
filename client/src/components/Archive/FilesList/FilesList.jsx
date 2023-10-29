/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
import { Grid, Stack, Typography, useTheme, Paper } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import emptyImage from "@assets/emptyImage.webp";
import pdfImage from "@assets/pdf.png";
import { setSelectedItem } from "@store/toolsbar/toolsbarSlice";
import "./FileList.scss";
import { Download } from "@mui/icons-material";
import NoDataMsg from "@components/Common/NoDataMsg/NoDataMsg";
import { styled } from "@mui/material/styles";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { useState } from "react";
import FileDialog from "./FileDialog/FileDialog";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function FilesList() {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const theme = useTheme();
  const { folderDetails: folder, archiveDetails: archive } = useSelector((state) => state.folders);
  const { components, open } = useSelector((state) => state.toolsbar);
  const { selectedItem } = components;
  const api = import.meta.env.API_URL || "http://localhost:8080";
  const handleClick = (obj) => {
    dispatch(setSelectedItem({ type: "file", item: obj }));
  };

  return (
    <div className="files">
      <Typography
        variant="h6"
        color={theme.palette.secondary[400]}
        border={`1px solid ${theme.palette.secondary[400]}`}
        borderBottom={"unset"}
        borderRadius={"10px 10px 0 0"}
        width="fit-content"
        px={2}
        py={1}
        fontSize={12}
        sx={{ mt: 10 }}
      >
        الملفات
      </Typography>
      {archive?.files?.length > 0 ? (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
          {archive?.files?.map((item, i) => {
            const isPdf = item.name.split(".")[1] === "pdf";
            const imgUrl = `${api}/${item.path}`;
            return (
              <Grid key={item._id} item sm={3} xs={6} onClick={() => handleClick(item)}>
                <div className={`files-item  ${selectedItem.item._id === item._id ? "active" : ""}`}>
                  <p className="smallTxt"> {item.name.split(".")[0]} </p>
                  <img
                    className="files-item-img flex-center"
                    src={isPdf ? pdfImage : imgUrl}
                    alt="img"
                    width={"100%"}
                    style={{ padding: isPdf ? "2rem" : "1rem" }}
                    content-type={item?.mimetype || "image/png"}
                  />
                  <div className="flex-between gap-1">
                    <div className="flex-items-center gap-1">
                      <a href={`${api}/api/v0/files/download/${item._id}`} download className="flex-center">
                        <Download sx={{ color: "#999", fontSize: 20 }} className="flex-center" />
                      </a>
                      <Typography sx={{ fontSize: ".7rem", fontWeight: 800 }} className="smallTxt">
                        {item.size}
                      </Typography>
                    </div>
                    {!isPdf && (
                      <div className="flex-center">
                        <RemoveRedEyeIcon
                          onClick={() => {
                            setShow(true);
                            setSelectedFile(imgUrl);
                          }}
                          sx={{ fontSize: 20, color: "#999" }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <NoDataMsg msg="لا يوجد ملفات" />
      )}
      <FileDialog open={show} setOpen={setShow} selectedFile={selectedFile} />
    </div>
  );
}

export default FilesList;
