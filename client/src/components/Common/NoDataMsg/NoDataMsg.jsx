import { Typography } from "@mui/material";

function NoDataMsg({ msg }) {
  return (
    <Typography
      sx={{
        fontSize: "3rem",
        textAlign: "center",
        color: "#ddd",
        fontWeight: 900,
      }}>
      {msg}
    </Typography>
  );
}

export default NoDataMsg;
