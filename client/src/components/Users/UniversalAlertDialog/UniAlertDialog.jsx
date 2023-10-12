import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Alert, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetToolbar, setRemove } from "@store/toolsbar/toolsbarSlice";
// import Button from "../Button/Button";

export default function UniAlertDialog({
  buttonTitle,
  header,
  text,
  body,
  footer,
}) {
  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { remove } = useSelector((state) => state.toolsbar);
  const { selectedItem } = useSelector((state) => state.toolsbar.components);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    dispatch(setRemove(false)) 
    dispatch(resetToolbar());
  };

  return (
    <div>
      {/* <Button
        variant="contained"
        onClick={handleClickOpen}
        className="btnFooter">
        {buttonTitle}
      </Button> */}
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={remove}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{header}</DialogTitle>
        <DialogContent>
          <Alert variant="outlined" severity="error">
            كن حذرا, هذا الاجراء لا رجعة فيه
          </Alert>
          {text && (
            <DialogContentText sx={{ marginBottom: ".5rem", color: "#fff" }}>
              {" "}
              {text}{" "}
            </DialogContentText>
          )}
          {body}
        </DialogContent>
        <DialogActions>{footer}</DialogActions>
      </Dialog>
    </div>
  );
}
