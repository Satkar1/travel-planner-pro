export default function WeatherDisplay({ weather }) {
  if (!weather) return null;

  const weatherIcons = {
    'Sunny': '☀️',
    'Cloudy': '☁️',
    'Rainy': '🌧️',
    'Snowy': '❄️',
    'Stormy': '⛈️',
    'default': '🌈'
  };

  const weatherIcon = weatherIcons[weather.conditions] || weatherIcons.default;

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
      <div className="p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Current Weather</h2>
        <div className="flex items-center space-x-6">
          <span className="text-5xl">{weatherIcon}</span>
          <div>
            <p className="text-3xl font-bold text-gray-800">{weather.temperature}°C</p>
            <p className="text-lg text-gray-600 capitalize">{weather.conditions}</p>
          </div>
          <div className="ml-auto grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Humidity:</span> {weather.humidity || '--'}%
            </div>
            <div>
              <span className="font-medium text-gray-700">Wind:</span> {weather.windSpeed || '--'} km/h
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}