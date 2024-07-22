import { Box, Grid, SvgIcon } from "@mui/material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import AirIcon from "@mui/icons-material/Air";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import HumidityIcon from "../../../../assets/humidity.svg?react";

interface AirConditionsItemProps {
    title: string,
    value: string,
    type: string
}

const AirConditionsItem: React.FC<AirConditionsItemProps> = ({type, title, value}) => {
  let iconContent;

  if (type === "temperature")
    iconContent = <ThermostatIcon sx={{ fontSize: "18px" }} />;
  else if (type === "wind")
    iconContent = <AirIcon sx={{ fontSize: "18px" }} />;
  else if (type === "clouds")
    iconContent = <FilterDramaIcon sx={{ fontSize: "18px" }} />;
  else if (type === "humidity")
    iconContent = (
      <SvgIcon
        component={HumidityIcon}
        inheritViewBox
        sx={{ fontSize: "18px" }}
      />
    );

  return (
    <Grid
      item
      xs={3}
      sx={{
        padding: "0",
        height: "80px",
      }}
    >
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100%",
          height: "40px",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            color: "rgba(255, 255, 255, .7)",
            padding: 0,
          }}
        >
          {iconContent}
        </Box>
        <Box
          sx={{
            color: "rgba(255, 255, 255, .7)",
            fontSize: { xs: "10px", sm: "12px", md: "14px" },
            paddingLeft: { xs: "0px", sm: "4px", md: "6px" },
            paddingTop: { xs: "2px", sm: "0px" },
            display: "flex",
            alignItems: "center",
          }}
        >
          {title}
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "40px" }}
      >
        <Box
          sx={{
            fontFamily: "Poppins",
            fontWeight: "600",
            fontSize: { xs: "12px", sm: "14px", md: "16px" },
            color: "white",
            lineHeight: 1,
          }}
        >
          {value}
        </Box>
      </Grid>
    </Grid>
  );
};

export default AirConditionsItem;
