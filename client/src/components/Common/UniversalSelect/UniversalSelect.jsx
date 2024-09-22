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
export default function UniversalSelect({
  disabled,
  name,
  title,
  options,
  value,
  setValue,
  onClick,
  formik,
  ...rest
}) {
  const theme = useTheme();
  const handleChange = (event) => {
    const selectedOption = options.find(
      (option) => option?.name === event.target.value
    );
    if (selectedOption) {
      formik.setFieldValue(name, selectedOption?.name); // Call the onRoleChange callback
    }
    // setValue(event.target.value);
  };
  return (
    <div className="uni-select">
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
        }}>
        <InputLabel id="demo-simple-select-helper-label">{title}</InputLabel>
        <Select
          {...rest}
          sx={{
            cursor: "pointer",
            "&.Mui-disabled": {
              color: "#fff !important",
            },
          }}
          disabled={disabled}
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          name={"role"}
          value={value}
          label={title}
          onChange={(e) => {
            handleChange(e);
          }}>
          {/* <MenuItem value="">
            <em>None</em>
          </MenuItem> */}
          {options?.map((item, i) => (
            <MenuItem
              key={i}
              style={{ color: "#fff !important" }}
              value={item?.name}
              defaultValue={options[0]?.label}
              sx={{
                color: "#000 !important",
                // disabled color #fff
                "&.Mui-disabled": {
                  color: "#000 !important",
                },
                "&.MuiSelect-nativeInput": {
                  color: "#000 !important",
                },
              }}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
