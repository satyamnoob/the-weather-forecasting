import { Typography } from "@mui/material";
import { getISTDatetime } from "../../utils/DateTimeUtils";

function ISTDateTime() {
  const ISTDateTime = (
    <Typography
      variant="h2"
      component="h2"
      sx={{
        fontWeight: "600",
        fontSize: { xs: "10px", sm: "12px" },
        color: "rgba(255, 255, 255, .7)",
        lineHeight: 1,
        paddingRight: "2px",
        fontFamily: "Poppins",
      }}
    >
      {getISTDatetime()} IST
    </Typography>
  );
  return ISTDateTime;
}

export default ISTDateTime;
