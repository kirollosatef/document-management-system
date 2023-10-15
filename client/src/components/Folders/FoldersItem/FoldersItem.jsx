import { Grid, Stack, Typography } from "@mui/material";
import folderIcon from '@assets/images/folder-primary.png'

function FoldersItem() {
  return (
    <Grid item>
      <Stack
        direction={"row"}
        gap={5}
        alignItems={"center"}
        className="folders-item">
        <div className="flex-center folders-item-img">
          <img src={folderIcon} alt="folder" width={100} />
        </div>
        <div>
          <Typography sx={{ fontWeight: 700 }}>اسم المجلد</Typography>
          <Typography
            variant="body2"
            sx={{ maxWidth: "150px" }}
            className="smallTxt">
            الوصف الخاص بيالوصف الخاص بيالوصف الخاص بيالوصف الخاص بيالوصف الخاص
            بي
          </Typography>
          <div className="folders-item-creator">
            <Typography sx={{ fontSize: 10, fontWeight: 700, color: "#999" }}>
              تم الانشاء من قبل:
            </Typography>
            <Typography sx={{ fontSize: 10, fontWeight: 600 }}>
              mohammed
            </Typography>
          </div>
        </div>
      </Stack>
    </Grid>
  );
}

export default FoldersItem;
