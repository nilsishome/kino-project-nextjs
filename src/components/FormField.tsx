import { TextField, FormControl, FormLabel } from "@mui/material";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  fullWidth?: boolean;
  multiline?: boolean;
  rows?: number;
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type = "text",
  required = false,
  fullWidth = true,
  multiline = false,
  rows = 1,
}) => (
  <FormControl fullWidth={fullWidth}>
    <FormLabel htmlFor={name}>{label}</FormLabel>
    <TextField
      id={name}
      name={name}
      type={type}
      required={required}
      fullWidth={fullWidth}
      variant="outlined"
      multiline={multiline}
      rows={rows}
      sx={{ backgroundColor: "white" }} // Set color on fields to white
      slotProps={{ htmlInput: { style: { color: "black" } } }} // Instead of inputProps
    />
  </FormControl>
);
export default FormField;
