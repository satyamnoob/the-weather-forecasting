import React from 'react';
import { Grid } from '@mui/material';
import Details from './details/Details';
import { CompleteTodayWeatherData } from '../../../utils/WeatherApiFunctions';
import AirConditions from './air-conditions/AirConditions';
import Forecast from './forecasts/Forecast';

interface TodayWeatherProps {
  data: CompleteTodayWeatherData;
}

const TodayWeather: React.FC<TodayWeatherProps> = ({ data }) => {
  return (
    <Grid container sx={{ padding: '3rem 0rem 0rem' }}>
      <Details 
        place={data.place} 
        date={data.date} 
        temperature={data.temperature} 
        icon={data.icon}
        description={data.description}
      />
      <AirConditions feelsLike={data.feelsLike} wind={data.wind} clouds={data.clouds} humidity={data.humidity}/>
      <Forecast todaysAvailaibleForecasts={data.todaysAvailaibleForecasts} />
    </Grid>
  );
};

export default TodayWeather;