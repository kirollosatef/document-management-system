import { Grid, Stack, Typography } from "@mui/material";
import folderIcon from "@assets/images/folder-primary.png";
import { useDispatch, useSelector } from "react-redux";
import { setOpen } from "@store/toolsbar/toolsbarSlice";

function FoldersItem({ folder, handleClick }) {
  const dispatch = useDispatch();
  const { name, description, creator, _id } = folder;
  const { selectedItem } = useSelector((state) => state.toolsbar.components);
  const handleDoubleClick = () => {
    dispatch(setOpen(true));
  };

  return (
    <Grid
      item
      onClick={() => handleClick(folder)}
      onDoubleClick={() => handleDoubleClick(folder)}>
      <Stack
        direction={"row"}
        gap={5}
        alignItems={"center"}
        className={`folders-item ${
          selectedItem.item._id === _id ? "active" : ""
        } `}>
        <div className="flex-center folders-item-img">
          <img src={folderIcon} alt="folder" width={100} />
        </div>
        <div>
          <Typography
            className="smallTxt"
            sx={{ fontWeight: 700, maxWidth: "150px" }}>
            {" "}
            {name}{" "}
          </Typography>
          <Typography
            variant="body2"
            sx={{ maxWidth: "150px" }}
            className="smallTxt">
            {description}
          </Typography>
          <div className="folders-item-creator">
            <Typography sx={{ fontSize: 10, fontWeight: 700, color: "#999" }}>
              تم الانشاء من قبل:
            </Typography>
            <Typography sx={{ fontSize: 10, fontWeight: 600 }}>
              {creator.name}
            </Typography>
          </div>
        </div>
      </Stack>
    </Grid>
  );
}

export default FoldersItem;
