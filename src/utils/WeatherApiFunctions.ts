import { DAYS, MONTHS } from "./DateConstants";

export interface CompleteTodayWeatherData {
  place: string;
  date: string;
  temperature: string;
  description: string;
  icon: string;
  feelsLike: string;
  wind: string;
  clouds: string;
  humidity: string;
  todaysAvailaibleForecasts: {
    temperature: string;
    time: string;
    icon: string;
    description: string;
  }[];
}

export interface WeeklyForecast {
  weekday: string;
  icon: string;
  description: string;
  temperature: string;
  cloud: string;
  wind: string;
  humidity: string;
}

interface DailyForecastAccumulator {
  weekday: string;
  iconCounts: { [key: string]: number };
  descriptionCounts: { [key: string]: number };
  temperature: number;
  cloud: number;
  wind: number;
  humidity: number;
  readings: number;
}

interface WeatherItem {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const todayWeatherJsonToObject = (today: any, weekly: any) => {
  const completeTodayWeatherData: CompleteTodayWeatherData = {
    place: `${today.name}, ${today.sys.country}`,
    date: epochToDate(Number(today.dt)),
    temperature: `${Math.round(today.main.temp)} °C`,
    feelsLike: `${Math.round(today.main.feels_like)} °C`,
    humidity: `${today.main.humidity} %`,
    description: today.weather[0].description,
    icon: today.weather[0].icon,
    wind: `${today.wind.speed} m/s`,
    clouds: `${today.clouds.all} %`,
    todaysAvailaibleForecasts: extractTodaysForecast(
      weekly.list,
      today.weather[0].description
    ),
  };

  return completeTodayWeatherData;
};

const epochToDate = (epoch: number) => {
  const date = new Date(epoch * 1000);

  return `Today ${date.getDate()} ${MONTHS[date.getMonth()].substring(0, 4)}`;
};

function extractTodaysForecast(list: WeatherItem[], description: string) {
  const today = new Date();
  const todayString = today.toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format

  return list
    .filter((item) => {
      const itemDate = new Date(item.dt * 1000);
      return itemDate.toISOString().split("T")[0] === todayString;
    })
    .map((item) => {
      const date = new Date(item.dt * 1000);
      const time = date.toTimeString().split(" ")[0].slice(0, 5); // Get time in HH:MM format

      return {
        temperature: `${Math.round(item.main.temp)} °C`,
        time: time,
        icon: item.weather[0].icon,
        description,
      };
    });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const weeklyWeatherJsonToObject = (weekly: any): WeeklyForecast[] => {
  if (!weekly || Object.keys(weekly).length === 0 || weekly.cod === "404") {
    return [];
  } else {
    const weeklyForecastMap = new Map<number, DailyForecastAccumulator>();

    for (let i = 0; i < weekly.list.length && weeklyForecastMap.size < 7; i++) {
      const data = weekly.list[i];
      const dataDate = new Date(data.dt * 1000).getDate();
      const weekday = new Date(data.dt * 1000).getDay();
      
      if (!weeklyForecastMap.has(dataDate)) {
        weeklyForecastMap.set(dataDate, {
          weekday: DAYS[weekday],
          iconCounts: { [data.weather[0].icon]: 1 },
          descriptionCounts: { [data.weather[0].description]: 1 },
          temperature: data.main.temp,
          cloud: data.clouds.all,
          wind: data.wind.speed,
          humidity: data.main.humidity,
          readings: 1
        });
      } else {
        const existing = weeklyForecastMap.get(dataDate)!;
        existing.temperature += data.main.temp;
        existing.cloud += data.clouds.all;
        existing.wind += data.wind.speed;
        existing.humidity += data.main.humidity;
        existing.iconCounts[data.weather[0].icon] = (existing.iconCounts[data.weather[0].icon] || 0) + 1;
        existing.descriptionCounts[data.weather[0].description] = (existing.descriptionCounts[data.weather[0].description] || 0) + 1;
        existing.readings++;
      }
    }

    return Array.from(weeklyForecastMap.values()).map(forecast => {
      const mostCommonIcon = Object.entries(forecast.iconCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      const mostCommonDescription = Object.entries(forecast.descriptionCounts).reduce((a, b) => a[1] > b[1] ? a : b)[0];
      
      return {
        weekday: forecast.weekday,
        icon: mostCommonIcon,
        description: mostCommonDescription,
        temperature: `${(forecast.temperature / forecast.readings).toFixed(0)} °C`,
        cloud: Math.round(forecast.cloud / forecast.readings).toFixed(0) + " %",
        wind: (forecast.wind / forecast.readings).toFixed(2) + " m/s",
        humidity: Math.round(forecast.humidity / forecast.readings).toFixed(0) + " %"
      };
    });
  }
};
