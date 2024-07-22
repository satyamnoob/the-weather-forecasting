import { Grid } from "@mui/material";
import React from "react";
import Heading from "../../../reusable/Heading";
import AirConditionsItem from "./AirConditionsItem";

interface AirConditionsProps {
  feelsLike: string;
  wind: string;
  clouds: string;
  humidity: string;
}

const AirConditions: React.FC<AirConditionsProps> = ({
  feelsLike,
  wind,
  clouds,
  humidity,
}) => {
  return (
    <Grid marginTop={"2.9rem"} container>
      <Grid item xs={12}>
        <Heading title={"AIR CONDITIONS"} />
        <Grid container>
          <AirConditionsItem
            title="Real Feel"
            value={`${feelsLike}`}
            type="temperature"
          />
          <AirConditionsItem title="Wind" value={`${wind}`} type="wind" />
          <AirConditionsItem
            title="Clouds"
            value={`${clouds}`}
            type="clouds"
          />
          <AirConditionsItem
            title="Humidity"
            value={`${humidity}`}
            type="humidity"
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AirConditions;
