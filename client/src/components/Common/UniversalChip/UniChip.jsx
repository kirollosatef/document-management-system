import { Chip } from "@mui/material";
import "./UniChip.scss";
function UniChip({ label, role }) {
  // Define a mapping from roles to CSS classes
  const roleToClass = {
    superadmin: "superadmin-chip",
    editor: "editor-chip",
    viewer: "viewer-chip",
  };

  // Get the CSS class for the user's role
  const chipClass = roleToClass[role];

  return (
    <Chip label={label} className={chipClass} variant="outlined" size="small" sx={{fontWeight:"bold"}} />
  );
}

export default UniChip;
