import keys from "../utils/keys";

class WeatherApiService {
  baseUrl: string;
  apiKey: string;

  constructor() {
    this.baseUrl = "https://api.openweathermap.org/data/2.5";
    this.apiKey = keys.WEATHER_API_KEY;
  }

  async fetchWeatherData(lat: string, lon: string) {
    try {
      const [currentWeatherPromise, forecastPromise] = await Promise.all([
        fetch(
          `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
        ),
        fetch(
          `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
        ),
      ]);

      const currentWeatherData = await currentWeatherPromise.json();
      const forecastData = await forecastPromise.json();

      return [currentWeatherData, forecastData];
    } catch (error) {
    //   console.log("Error", error);
    }
  }
}

export const weatherApiService = new WeatherApiService();
