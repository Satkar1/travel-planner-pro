export const parsePriceRange = (priceRange) => {
  const matches = priceRange.match(/\$(\d+).*\$(\d+)/) || 
                 priceRange.match(/\$(\d+)/);
  
  if (!matches) return { min: 0, max: 0, avg: 0 };
  
  if (matches.length === 3) {
    const min = parseInt(matches[1]);
    const max = parseInt(matches[2]);
    return { min, max, avg: (min + max) / 2 };
  }
  
  const value = parseInt(matches[1]);
  return { min: value, max: value, avg: value };
};

export const parseDuration = (duration) => {
  const matches = duration.match(/(\d+)h\s*(\d*)m?/);
  if (!matches) return 0;
  
  const hours = parseInt(matches[1]) || 0;
  const minutes = parseInt(matches[2]) || 0;
  return hours * 60 + minutes;
};

export const getWeatherIcon = (conditionCode) => {
  const icons = {
    '01d': '☀️',
    '02d': '⛅',
    '03d': '☁️',
    '04d': '☁️',
    '09d': '🌧️',
    '10d': '🌦️',
    '11d': '⛈️',
    '13d': '❄️',
    '50d': '🌫️'
  };
  return icons[conditionCode] || '🌈';
};