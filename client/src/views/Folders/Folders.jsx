import { Grid, Typography } from "@mui/material";
import './folders.scss'
import FoldersItem from "@components/Folders/FoldersItem/FoldersItem";

function Folders() {
  return (
    <div className="folders">
      <Typography variant="h6">المجلدات</Typography>
      <Grid container spacing={4}> 
        <FoldersItem/>
      </Grid>
    </div>
  );
}

export default Folders;
