import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Alert, Button, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { resetToolbar, setRemove } from "@store/toolsbar/toolsbarSlice";
import { deleteUser } from "@store/users/usersActions";
// import Button from "../Button/Button";

export default function UniAlertDialog({
  header,
  text,
  body,
  handleClose,
  handleConfirm,
}) {
  const dispatch = useDispatch();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { remove } = useSelector((state) => state.toolsbar);

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth={true}
        open={remove}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">{header}</DialogTitle>
        <DialogContent>
          <Alert variant="outlined" severity="error" sx={{
            gap: 2, border: "none", paddingRight: 0,
            '.MuiAlert-icon': {
              marginRight: 0,
              
            },
            '.MuiAlert-message': {
              fontWeight:700
            }
          }}>
            كن حذرا, هذا الاجراء لا رجعة فيه
          </Alert>
          {text && (
            <DialogContentText sx={{ marginTop: "1rem" }}>
              {text}
            </DialogContentText>
          )}
          {body}
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "flex-start", padding: "20px 24px" }}>
          <Stack direction="row" gap={2} sx={{ justifyContent: "flex-start" }}>
            <Button variant="outlined" color="success" onClick={handleConfirm}>
              نعم
            </Button>
            <Button variant="outlined" color="error">
              لا
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}
