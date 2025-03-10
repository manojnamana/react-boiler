import React, { forwardRef } from "react";
import { TextField } from "@mui/material";

const TextFieldPhoneInput = (props, ref) => {
  const { touched, errors } = props;
  return (
    <TextField
      {...props}
      inputRef={ref}
      fullWidth
      label="Phone"
      variant="outlined"
      error={Boolean(touched && errors)}
      helperText={touched && errors}
    />
  );
};

TextFieldPhoneInput.propTypes = {};
export default forwardRef(TextFieldPhoneInput);
