import { Typography } from "@mui/material";
import React from "react";

function CommingSoon() {
  return (
    <Typography
      className="flex-center"
      sx={{
        color: "#ddd",
        fontSize: {
            lg: "20rem",
            xs: "5rem"
            
        },
      }}>
      قَرِيبًا...
    </Typography>
  );
}

export default CommingSoon;
