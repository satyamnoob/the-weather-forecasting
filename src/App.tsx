import logo from "./assets/logo-edited.png";
import SplashIcon from "./assets/splash-icon.svg?react";
import bgImage from "./assets/bgImage.png";
import ISTDateTime from "./components/reusable/ISTDateTime";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Box, CircularProgress, Container, Grid, Link, SvgIcon, Typography } from "@mui/material";
import SearchBar, { Option } from "./components/main/searchbar/SearchBar";
import { useState } from "react";
import ErrorBox from "./components/reusable/ErrorBox";
import { weatherApiService } from "./services/weather_api_service";
import React from "react";
import TodayWeather from "./components/main/today-weather/TodayWeather";
import { CompleteTodayWeatherData, todayWeatherJsonToObject, WeeklyForecast, weeklyWeatherJsonToObject } from "./utils/WeatherApiFunctions";
import WeeklyForecastComponent from "./components/main/weekly-forecast/WeeklyForecast";

function App() {
  const [errorOccured, setErrorOccured] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isWeatherFetched, setIsWeatherFetched] = useState(false);
  const [todayForecast, setTodayForecast] = useState<CompleteTodayWeatherData|null>(null);
  const [weeklyForecast, setWeeklyForecast] = useState<WeeklyForecast[]|null>(null);

  const onSearch = async (option: Option) => {
    const [latitude, longitude] = option.value.split(':');
    setIsLoading(true);
    try {
      const [todayForecastResponse, weeklyForecastResponse] = await weatherApiService.fetchWeatherData(latitude, longitude);
      console.log(todayForecastResponse);
      console.log(weeklyForecastResponse);
      const completeTodayWeatherData: CompleteTodayWeatherData = todayWeatherJsonToObject(todayForecastResponse, weeklyForecastResponse);
      const weeklyWeatherData: WeeklyForecast[] = weeklyWeatherJsonToObject(weeklyForecastResponse);
      setIsWeatherFetched(true);
      setTodayForecast(completeTodayWeatherData);
      console.log("Weekly Forecast Data: ", weeklyForecastResponse);
      setWeeklyForecast(weeklyWeatherData);

    } catch (error) {
      setErrorOccured(true);
    }

    setIsLoading(false);
  };

  let mainContent = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="500px"
      width="100%"
    >
      <SvgIcon
        component={SplashIcon}
        inheritViewBox
        sx={{ fontSize: { xs: "100px", sm: "120px", md: "140px" } }}
      />
      <Typography
        variant="h4"
        component="h4"
        sx={{
          fontSize: { xs: "12px", sm: "14px" },
          color: "rgba(255,255,255, .85)",
          fontFamily: "Poppins",
          textAlign: "center",
          margin: "2rem 0",
          maxWidth: "80%",
          lineHeight: "22px",
        }}
      >
        Explore current weather data and 6-day forecast of more than 200,000
        cities!
      </Typography>
    </Box>
  );

  if(isWeatherFetched && todayForecast && weeklyForecast) {
    mainContent = (
      <React.Fragment>
        <Grid container display={"flex"}>
          <Grid xs={12} md={6} item>
            <TodayWeather data={todayForecast}/>
          </Grid>
          <Grid xs={12} md={6} item>
            <WeeklyForecastComponent weeklyForecastData={weeklyForecast}/>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }

  if(errorOccured) {
    mainContent = ( 
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="500px"
        width="100%"
      >
        <ErrorBox />
      </Box> 
    );
  } 

  if(isLoading) {
    mainContent = (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="500px"
        width="100%"
      >
        <CircularProgress sx={{
          color: "white",
          marginBottom: "1rem"
        }} />
        <Typography
            variant="h3"
            component="h3"
            sx={{
              fontSize: { xs: '10px', sm: '12px' },
              color: 'rgba(255, 255, 255, .8)',
              lineHeight: 1,
              fontFamily: 'Poppins',
            }}
          >
            Loading...
          </Typography>
      </Box>
    );
  }

  return (
    <Container
      sx={{
        maxWidth: {
          xs: "95%",
          sm: "80%",
          md: "1100px",
        },
        width: "100%",
        height: "100%",
        margin: "0 auto",
        padding: "1rem 3rem",
        marginBottom: "1rem",
        borderRadius: {
          xs: "none",
          sm: "0 0 1rem 1rem",
        },
        boxShadow: {
          xs: "none",
          sm: "rgba(200, 200, 200, 0.3) 0px 1px 2px 0px, rgba(200, 200, 200, 0.15) 0px 1px 3px 1px",
        },
        background: `url(${bgImage})`,
      }}
    >
      <Grid container>
        <Grid xs={12} item>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
            marginBottom={"1rem"}
          >
            <Box
              sx={{
                width: "auto",
                height: { xs: "16px", sm: "22px", md: "28px" },
              }}
              component={"img"}
              alt="logo"
              src={logo}
            />
            <ISTDateTime />
            <Link
              href="https://github.com/satyamnoob"
              target="_blank"
              underline="none"
              sx={{ display: "flex" }}
            >
              <GitHubIcon
                sx={{
                  fontSize: { xs: "20px", sm: "22px", md: "26px" },
                  color: "white",
                  "&:hover": { color: "#2d95bd" },
                }}
              />
            </Link>
          </Box>
          <SearchBar onSearch={onSearch} />
        </Grid>
        <Grid marginBottom={"20px"} xs={12} item>
          {mainContent}
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
