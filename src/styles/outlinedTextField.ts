
const outlinedTextField = {
  mb: 2,
  "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
    borderColor: "#F1DDC5",
    borderWidth: "1px",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#C43C3A",
    borderWidth: "1px",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#C43C3A",
    borderWidth: "1.5px",
  },
  "& .MuiInputLabel-root": {
    color: "#F1DDC5",
    fontWeight: "500",
    "&.Mui-focused": {
      color: "#F1DDC5",
      fontWeight: "500",
    },
  },
  // Färg för vanlig text
  "& .MuiOutlinedInput-input": {
    color: "#F1DDC5 !important",
    WebkitTextFillColor: "#F1DDC5 !important", // För autofill
  },
  // Färg för autofill (Chrome/Safari)
  "& input:-webkit-autofill": {
    WebkitBoxShadow: "0 0 0 100px #222 inset",
    WebkitTextFillColor: "#F1DDC5 !important",
    color: "#F1DDC5 !important",
    caretColor: "#F1DDC5",
    borderRadius: "inherit",
  },
  // Färg för base input (fallback)
  "& .MuiInputBase-input": {
    color: "#F1DDC5 !important",
  },
};

export default outlinedTextField;