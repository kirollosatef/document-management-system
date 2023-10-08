import { TextField, useTheme } from "@mui/material";

function UniInput({ name, label, type, value, onChange, error, helperText }) {
  const theme = useTheme()
  return (
    <TextField
      dir="rtl"
      name={name}
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      error={error}
      helperText={helperText}
      className="uniInput"
      sx={{
        "& .MuiInputLabel-root ": {
          right: "5%",
          left: "unset",
              transformOrigin: "top right", // Very IMP
        },
        "& .MuiInputLabel-root.Mui-focused ": {
          right: "5% !important",
          left: "unset",
        },
        "& .MuiOutlinedInput-notchedOutline": {
          textAlign: "right",
        },
        "& .MuiFormHelperText-root ": {
          textAlign: "right",
        },
        "& .MuiOutlinedInput-root": {
          outlineColor: "transparent",
        },
        "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
          borderColor: theme.palette.primary[900],
        },
        "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": {
          color: theme.palette.primary[900],
        },
      }}
    />
  );
}

export default UniInput;
