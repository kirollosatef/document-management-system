import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { createArchive } from "@store/folders/foldersActions";
import { Button, Stack, Typography } from "@mui/material";
import { Image } from "@mui/icons-material";
import { toast } from "react-toastify";

function UploadFiles({
  selectedFiles,
  setSelectedFiles,
  setMultiple,
  multiple,
}) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = e.target.files;

    // Filter files to keep only images (JPEG, PNG) and PDFs
    const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];
    const filteredFiles = Array.from(files).filter((file) =>
      allowedFileTypes.includes(file.type)
    );

    setSelectedFiles(filteredFiles);

    // Check if any unsupported files were selected and show a toast
    const unsupportedFiles = Array.from(files).filter(
      (file) => !allowedFileTypes.includes(file.type)
    );

    if (unsupportedFiles.length > 0) {
      toast.error("الملف غير مدعوم");
    }
  };

  const handleFileButton = () => {
    if (!multiple) {
      setMultiple(true);
    }
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        style={{ display: "none" }} // Hide the file input
        ref={fileInputRef}
      />
      <Stack className="flex-items-center" gap={2}>
        <Button
          variant="text"
          color="success"
          size="small"
          sx={{ fontSize: ".8rem", padding: ".3rem 1rem", gap: 2 }}
          onClick={handleFileButton}
          startIcon={<Image sx={{ width: 15 }} />}>
          رفع صور
        </Button>
        <Typography fontSize={10}> {selectedFiles.length} ملفات </Typography>
      </Stack>
    </div>
  );
}

export default UploadFiles;
