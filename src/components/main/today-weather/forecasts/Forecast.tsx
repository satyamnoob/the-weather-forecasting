import { Grid, Typography } from "@mui/material";
import React from "react";
import Heading from "../../../reusable/Heading";
import ForecastItems from "./ForecastsItems";

interface ForecastProp {
  todaysAvailaibleForecasts: {
    temperature: string;
    time: string;
    icon: string;
    description: string;
  }[];
}

const Forecast: React.FC<ForecastProp> = ({ todaysAvailaibleForecasts }) => {
  return (
    <>
      <Grid sx={{ marginTop: "2.9rem", marginBottom: "0.3rem" }} container>
        <Grid item xs={12}>
          <Heading mb={"0.3rem"} title={"TODAY'S FORECAST"} />
        </Grid>
        <Grid item xs={12}>
          <Typography
            variant="h5"
            component="h5"
            sx={{
              fontSize: { xs: "10px", sm: "12px" },
              textAlign: "center",
              lineHeight: 1,
              color: "#04C4E0",
              fontFamily: "Roboto Condensed",
              marginBottom: "1rem",
            }}
          >
            {todaysAvailaibleForecasts.length === 1
              ? "1 available forecast"
              : `${todaysAvailaibleForecasts.length} available forecasts`}
          </Typography>
        </Grid>
        <Grid
          item
          container
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "fit-content",
          }}
          spacing="4px"
        >
          {todaysAvailaibleForecasts.map((item, idx) => {
            if (idx === todaysAvailaibleForecasts.length - 1) {
              return <></>;
            }
            return (
              <Grid
                key={idx}
                item
                xs={4}
                sm={2}
                display="flex"
                flexDirection="column"
                alignItems="center"
                sx={{
                  marginBottom: { xs: "1rem", sm: "0" },
                }}
              >
                <ForecastItems
                  time={item.time}
                  description={item.description}
                  temperature={item.temperature}
                  icon={item.icon}
                  idx={idx}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </>
  );
};

export default Forecast;
