import { Grid, Stack, Typography, useTheme } from "@mui/material";
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
            <p className="smallTxt"> {item.name.split(".")[0]} </p>
            <img
              className="files-item-img"
              src={emptyImage}
              alt="img"
              width={"100px"}
              onClick={() => window.open(`${api}/${item.path}`)}
            />
            <div className="flex-items-center gap-1">
              <a
                href={`${api}/api/v0/files/download/${item._id}`}
                download
                className="flex-center">
                <Download
                  sx={{ color: "#999", fontSize: 20 }}
                  className="flex-center"
                />
              </a>
              <Typography
                sx={{ fontSize: ".7rem", fontWeight: 800 }}
                className="smallTxt">
                {" "}
                {item.size}{" "}
              </Typography>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default FilesList;
