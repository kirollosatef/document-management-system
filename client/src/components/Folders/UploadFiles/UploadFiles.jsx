import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createArchive } from "@store/folders/foldersActions";

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
      <h2>Upload Files</h2>
      <input type="file" multiple onChange={handleFileChange} />
    </div>
  );
}

export default UploadFiles;
