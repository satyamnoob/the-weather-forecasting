import keys from "../utils/keys";

export interface TodayForecastResponse {
  name: string;
  sys: {
    country: string;
  };
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: {
    description: string;
    icon: string;
  }[];
  wind: {
    speed: number;
  };
  clouds: {
    all: number;
  };
}

export interface WeeklyForecastResponse {
  list: {
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      icon: string;
      description: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
    };
  }[];
}

class WeatherApiService {
  baseUrl: string;
  apiKey: string;

  constructor() {
    this.baseUrl = "https://api.openweathermap.org/data/2.5";
    this.apiKey = keys.WEATHER_API_KEY;
  }

  async fetchWeatherData(lat: string, lon: string): Promise<[TodayForecastResponse, WeeklyForecastResponse]>  {
    try {
      const [currentWeatherResponse, forecastResponse] = await Promise.all([
        fetch(
          `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
        ),
        fetch(
          `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
        ),
      ]);

      if (!currentWeatherResponse.ok) {
        throw new Error(`Failed to fetch current weather: ${currentWeatherResponse.statusText}`);
      }
      if (!forecastResponse.ok) {
        throw new Error(`Failed to fetch forecast: ${forecastResponse.statusText}`);
      }

      const currentWeatherData: TodayForecastResponse = await currentWeatherResponse.json();
      const forecastData: WeeklyForecastResponse = await forecastResponse.json();

      return [currentWeatherData, forecastData];
    } catch (error) {
      console.error("Error fetching weather data:", error);
      throw error;
    }
  }
}

export const weatherApiService = new WeatherApiService();
