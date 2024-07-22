import keys from "../utils/keys";

export interface CityData {
  id: string;
  city: string;
  latitude: string;
  longitude: string;
  countryCode: string;
}

class GeoApiService {
  options: {
    method: string;
    headers: { "x-rapidapi-key": string; "x-rapidapi-host": string };
  };
  baseUrl: string;

  constructor() {
    this.options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": keys.GEO_DB_API_KEY,
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
      },
    };
    this.baseUrl = "https://wft-geo-db.p.rapidapi.com/v1/geo/cities";
  }

  async searchCities(input: string): Promise<CityData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}?minPopulation=10000&namePrefix=${input}`,
        this.options
      );

      if (!response.ok) {
        throw new Error("Some error occurred");
      }

      const textData = await response.text(); // Get response as text
      const data = JSON.parse(textData); // Parse text to JSON
      const cities = data.data; // Access the 'data' property

      const cityDataArray: CityData[] = cities.map((city: CityData) => ({
        id: city.id,
        city: city.city,
        latitude: city.latitude,
        longitude: city.longitude,
        countryCode: city.countryCode,
      }));

      return cityDataArray;
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  }
}

const geoApiService = new GeoApiService();
export default geoApiService;
