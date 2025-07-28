'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import CityInput from '../components/CityInput';
import RecommendationCard from '../components/RecommendationCard';
import TravelChart from '../components/TravelChart';
import WeatherDisplay from '../components/WeatherDisplay';
import { getTravelRecommendations } from '../services/travelService';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

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
    <motion.main 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-4 py-8"
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          AI Travel Planner Pro
        </h1>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Your perfect travel companion powered by AI. Get personalized recommendations for your next adventure.
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden p-6 mb-8 border border-gray-100"
      >
        <CityInput
          source={source}
          destination={destination}
          setSource={setSource}
          setDestination={setDestination}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </motion.div>

      {weather && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <WeatherDisplay weather={weather} />
        </motion.div>
      )}

      {recommendations && (
        <motion.div 
          variants={containerVariants}
          className="grid gap-6 md:grid-cols-2"
        >
          <motion.div 
            variants={itemVariants}
            className="space-y-6"
          >
            {recommendations.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <RecommendationCard option={option} />
              </motion.div>
            ))}
          </motion.div>
          <motion.div 
            variants={itemVariants}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <TravelChart recommendations={recommendations} />
          </motion.div>
        </motion.div>
      )}
    </motion.main>
  );
}
