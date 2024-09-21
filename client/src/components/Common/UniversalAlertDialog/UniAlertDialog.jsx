import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function UniAlertDialog({
  header,
  text,
  body,
  handleClose,
  handleConfirm,
  isFileDelete = false,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { remove } = useSelector((state) => state.toolsbar);
  const [reason, setReason] = useState("");

  const onConfirm = () => {
    handleConfirm(isFileDelete ? reason : undefined);
  };

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
          <Alert
            variant="outlined"
            severity="warning"
            sx={{
              gap: 2,
              border: "none",
              paddingRight: 0,
              ".MuiAlert-icon": {
                marginRight: 0,
              },
              ".MuiAlert-message": {
                fontWeight: 700,
              },
            }}>
            يرجى التأكد من رغبتك في المتابعة، حيث لا يمكن التراجع عن هذا الإجراء
          </Alert>
          {text && (
            <DialogContentText sx={{ marginTop: "1rem" }}>
              {text}
            </DialogContentText>
          )}
          {body}
          {isFileDelete && (
            <TextField
              fullWidth
              multiline
              dir="rtl"
              rows={3}
              variant="outlined"
              label="سبب الحذف"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              sx={{ marginTop: "1rem" }}
            />
          )}
        </DialogContent>
        <DialogActions
          sx={{ justifyContent: "flex-start", padding: "20px 24px" }}>
          <Stack direction="row" gap={2} sx={{ justifyContent: "flex-start" }}>
            <Button variant="contained" color="primary" onClick={onConfirm}>
              تأكيد
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              إلغاء
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </div>
  );
}