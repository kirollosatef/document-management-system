import { Grid } from "@mui/material";
import { useSelector } from "react-redux";

function FilesList() {
  const { folderDetails: folder, archiveDetails: archive } = useSelector(
    (state) => state.folders
    );
    const img = "http://localhost:8080/65303aabb7e716972d544954/65303c01b7e716972d544982/41d025fe5bb34a62a4f001699092d525.jpeg"
  return (
    <Grid container>
      {archive?.files?.map((item) => (
        <Grid key={item._id} item>
          <p> {item.name} </p>
          <img
            src="http://localhost:8080/65303aabb7e716972d544954/65303c01b7e716972d544982/41d025fe5bb34a62a4f001699092d525.jpeg"
            alt="img"
          />
        </Grid>
      ))}
          <img
            src={img}
            alt="img"
          />
    </Grid>
  );
}

export default FilesList;
