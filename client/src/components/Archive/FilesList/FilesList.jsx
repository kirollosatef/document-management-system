import { Grid, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import emptyImage from "@assets/emptyImage.webp";
import { setSelectedItem } from "@store/toolsbar/toolsbarSlice";
import "./FileList.scss";
import { Download } from "@mui/icons-material";
function FilesList() {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { folderDetails: folder, archiveDetails: archive } = useSelector(
    (state) => state.folders
  );
  const { components, open } = useSelector((state) => state.toolsbar);
  const { selectedItem } = components;
  const api = "http://localhost:8080";
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
        sx={{ mt: 10 }}>
        الملفات
      </Typography>
      <Grid container gap={2}>
        {archive?.files?.map((item, i) => (
          <Grid
            key={item._id}
            item
            xs={6}
            sm={2}
            onClick={() => handleClick(item)}
            className={`files-item ${
              selectedItem.item._id === item._id ? "active" : ""
            }`}>
            <p className="smallTxt"> {item.name} </p>
            <img src={emptyImage} alt="img" width={"100px"} />
            <a
              href={`${api}/${item.path}`}
              download={item.name} // Set the download attribute with the desired file name
            >
              <Download sx={{ color: "#999", fontSize: 20 }} />
            </a>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default FilesList;
