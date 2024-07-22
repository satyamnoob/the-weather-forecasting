// src/utils/WeatherIcons.ts

import { ALL_DESCRIPTIONS } from './DateConstants';

// Function to import all icons
function importAll() {
  const icons: Record<string, string> = {};
  const iconModules = import.meta.glob('../assets/icons/*.png', { eager: true });

  Object.entries(iconModules).forEach(([path, module]) => {
    const fileName = path.split('/').pop() as string;
    icons[fileName] = (module as { default: string }).default;
  });

  return icons;
}

const icons = importAll();

// Create the WEATHER_DATA array
export const WEATHER_DATA = ALL_DESCRIPTIONS.map(item => ({
  ...item,
  image: icons[item.icon],
  nightImage: icons[item.icon.replace('d.png', 'n.png')]
}));

// Function to get the appropriate icon
export function getWeatherIcon(description: string, isNight: boolean = false): string {
  const weatherData = WEATHER_DATA.find(item => item.description.toLowerCase() === description.toLowerCase());
  if (weatherData) {
    return isNight ? weatherData.nightImage : weatherData.image;
  }
  // Return a default icon if description not found
  return isNight ? icons['01n.png'] : icons['01d.png'];
}

// If you need direct access to all icons
export const WEATHER_ICONS = icons;