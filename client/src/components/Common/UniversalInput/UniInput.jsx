import { TextField } from '@mui/material'
import React from 'react'

function UniInput({value,onChange,error,helperText}) {
  return (
    <TextField
    name="email"
    label="Email"
    value={value}
    onChange={onChange}
    error={error}
    helperText={helperText}
    sx={{
      "& .MuiInputLabel-root ": {
        right: "25px",
        left: "unset",
      },
      "& .MuiInputLabel-root.Mui-focused ": {
        right: "19px",
        left: "unset",
      },
      "& .MuiOutlinedInput-notchedOutline": {
        textAlign:"right"
      },
      "& .MuiFormHelperText-root ": {
        textAlign:"right"
      },
      "& .MuiOutlinedInput-root": {
        outlineColor: "transparent",
      },
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#7b2cbfff !important",
      },
      "& .MuiInputLabel-root, & .MuiInputLabel-root.Mui-focused": {
        color: "#7b2cbfff",
      },
    }}
  />
  )
}

export default UniInput