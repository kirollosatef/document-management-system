import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createArchive } from "@store/folders/foldersActions";
import { Typography } from "@mui/material";

function UploadFiles({selectedFiles, setSelectedFiles}) {
  const dispatch = useDispatch();
  
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      return; // No files selected
    }
  };

  return (
    <div>
      <Typography variant="body2">رفع ملفات</Typography>
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
}

export default UploadFiles;
