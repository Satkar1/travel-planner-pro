'use client';
import { useState } from 'react';
import CityInput from '../components/CityInput';
import RecommendationCard from '../components/RecommendationCard';
import TravelChart from '../components/TravelChart';
import WeatherDisplay from '../components/WeatherDisplay';
import { getTravelRecommendations } from '../services/travelService';

export default function Home() {
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!source || !destination) return;
    
    setLoading(true);
    try {
      const { travelOptions, weatherData } = await getTravelRecommendations(source, destination);
      setRecommendations(travelOptions);
      setWeather(weatherData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-indigo-800 mb-2">
        AI Travel Planner Pro
      </h1>
      <p className="text-center text-gray-600 mb-8">
        Your perfect travel companion powered by AI
      </p>

      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 mb-8">
        <CityInput
          source={source}
          destination={destination}
          setSource={setSource}
          setDestination={setDestination}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      {weather && (
        <WeatherDisplay weather={weather} />
      )}

      {recommendations && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            {recommendations.map((option, index) => (
              <RecommendationCard key={index} option={option} />
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <TravelChart recommendations={recommendations} />
          </div>
        </div>
      )}
    </main>
  );
}