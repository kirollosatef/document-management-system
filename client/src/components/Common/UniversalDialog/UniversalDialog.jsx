import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Button } from "@mui/material";
// import Button from "../Button/Button";

export default function UniversalDialog({
  buttonTitle,
  header,
  text,
  body,
  footer,
}) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        className="btnFooter"
      >{buttonTitle}</Button>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{header}</DialogTitle>
        <DialogContent>
          {text && <DialogContentText sx={{marginBottom:".5rem",color:"#fff" }}> {text} </DialogContentText>}
          {body}
        </DialogContent>
        <DialogActions>{footer}</DialogActions>
      </Dialog>
    </div>
  );
}
