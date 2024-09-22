import React from "react";
import { Button, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { downloadAllFiles } from "@store/folders/foldersActions";
import CommingSoon from "@components/CommingSoon/CommingSoon";

function Settings() {
  const dispatch = useDispatch();
  const { downloadingAllFiles, downloadAllFilesError } = useSelector((state) => state.folders);

  const handleDownloadAllFiles = () => {
    dispatch(downloadAllFiles());
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
        الإعدادات
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleDownloadAllFiles}
        disabled={downloadingAllFiles}
        style={{ marginBottom: '20px' }}
      >
        {downloadingAllFiles ? <CircularProgress size={24} /> : 'تحميل كل الملفات'}
      </Button>
      {downloadAllFilesError && (
        <Typography color="error">
          Error: {typeof downloadAllFilesError === 'string' ? downloadAllFilesError : JSON.stringify(downloadAllFilesError)}
        </Typography>
      )}
      {/* <CommingSoon /> */}
    </div>
  );
}

export default Settings;