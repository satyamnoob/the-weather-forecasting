import { Box, Grid } from "@mui/material";
import Heading from "../../reusable/Heading";

import { WeeklyForecast } from "../../../utils/WeatherApiFunctions";
import DayWeatherDetails from "./DayWeatherDetails";
import { getWeatherIcon } from "../../../utils/WeatherIcons";
import WeeklyForecastItem from "./WeeklyForecastItem";

interface WeeklyForecastComponentProps {
  weeklyForecastData: WeeklyForecast[];
}

const WeeklyForecastComponent: React.FC<WeeklyForecastComponentProps> = ({ weeklyForecastData }) => {
  return (
    <Grid container direction="column">
      <Grid item xs={12}>
        <Box
          padding={2}
          mb=".8rem"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 0 0',
          }}
        >
          <Heading title={"WEEKLY FORECAST"} />
        </Box>
      </Grid>
      {weeklyForecastData.map((item, idx) => (
        <Grid
          item
          key={idx}
          sx={{
            padding: '2px',
            background:
              'linear-gradient(0deg, rgba(255, 255, 255, .05) 0%, rgba(171, 203, 222, .05) 100%) 0% 0%',
            boxShadow:
              'rgba(0, 0, 0, 0.05) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
            borderRadius: '8px',
            marginBottom: '8px',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <DayWeatherDetails
                weekday={item.weekday}
                icon={getWeatherIcon(item.description)}
                description={item.description}
              />
            </Grid>
            <Grid item xs={4}>
              <WeeklyForecastItem type="temperature" value={item.temperature} />
              <WeeklyForecastItem type="clouds" value={item.cloud} />
            </Grid>
            <Grid item xs={4}>
              <WeeklyForecastItem type="wind" value={item.wind} />
              <WeeklyForecastItem type="humidity" value={item.humidity} />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default WeeklyForecastComponent;