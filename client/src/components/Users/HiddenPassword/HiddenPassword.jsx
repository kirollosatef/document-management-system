import { useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CircleIcon from "@mui/icons-material/Circle";
import { Stack } from "@mui/material";

function HiddenPassword({ password }) {
  const [hide, setHide] = useState(false);
  return (
    <Stack direction="row" gap="10px">
      <div>
        <VisibilityIcon onClick={() => setHide(!hide)} sx={{width:20}} />
      </div>
      <div>
        {!hide
          ? [...Array(5)].map((_, i) => <CircleIcon key={i} sx={{width:10}} />)
          : password}
      </div>
    </Stack>
  );
}

export default HiddenPassword;
