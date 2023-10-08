import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./UniversalSelect.scss";
import { useTheme } from "@mui/material";

/**
 * UniversalSelect component with labels.
 *
 * @param {Object} props - The component's props.
 * @param {string} props.title - The label/title for the select input.
 * @param {Array} props.options - An array of objects representing select options. each object should  contain name and value
 * @param {string} props.value - The selected option value.
 * @param {function} props.setValue - A function to handle value changes.
 * @returns {JSX.Element} - The rendered UniversalSelect component.
 */
export default function UniversalSelect({ disabled, title, options, value, setValue, onClick, ...rest }) {
  const theme = useTheme()
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <FormControl
        {...rest}
        sx={{
          m: 1,
          minWidth: 120,
          width: "100%",
          textAlign: "right",
          borderRadius: "20px", // Apply border radius
          bgcolor: theme.palette.grey.main, // Apply background color
          "& .MuiInputLabel-root": {
            color: "#fff", // Change label text color
          },
          "& .MuiInputBase-root": {
            border: "none", // Hide the border
          },
        }}
      >
        <InputLabel id="demo-simple-select-helper-label">{title}</InputLabel>
        <Select
          {...rest}
          sx={{
            cursor: "pointer",
            "&.Mui-disabled": {
              color: "#fff !important"
            }
          }}
          disabled={disabled}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label={title}
          onChange={handleChange}
          onClick={onClick}
        >
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {options.map((item, i) => (
            <MenuItem key={i} style={{ color: "#fff !important"}} value={item.value} sx={{
              color: "#fff !important",
              // disabled color #fff
              "&.Mui-disabled": {
                color: "#fff !important"
              },
              "&.MuiSelect-nativeInput": {
                color: "#fff !important"
              }
            }}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
