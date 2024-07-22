import { Typography } from "@mui/material";
import React from "react";

function ErrorBox() {
  return (
    <React.Fragment>
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: "12px", sm: "14px" },
          color: "rgba(255,255,255, .85)",
          fontFamily: "Poppins",
          textAlign: "center",
          maxWidth: "80%",
          lineHeight: "22px",
          margin: "3rem auto"
        }}
      >
        Some Error Occured
      </Typography>
    </React.Fragment>
  );
}

export default ErrorBox;
