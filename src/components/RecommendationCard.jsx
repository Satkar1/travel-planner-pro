import { motion } from 'framer-motion';
import { FaPlane, FaTrain, FaBus, FaCar, FaTaxi } from 'react-icons/fa';

const modeIcons = {
  'Flight': <FaPlane className="text-blue-500" size={24} />,
  'Train': <FaTrain className="text-green-500" size={24} />,
  'Bus': <FaBus className="text-purple-500" size={24} />,
  'Rental Car': <FaCar className="text-red-500" size={24} />,
  'Taxi/Uber': <FaTaxi className="text-yellow-500" size={24} />,
};

const cardVariants = {
  hover: {
    y: -5,
    boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
  }
};

export default function RecommendationCard({ option }) {
  return (
    <motion.div 
      className="bg-white/90 backdrop-blur-sm rounded-xl shadow-md overflow-hidden border border-gray-200"
      whileHover="hover"
      variants={cardVariants}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-3">
          {modeIcons[option.mode] || modeIcons['Taxi/Uber']}
          <h3 className="text-xl font-semibold text-gray-800">{option.mode}</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium text-gray-700">Price:</span> {option.priceRange}
          </div>
          <div>
            <span className="font-medium text-gray-700">Duration:</span> {option.duration}
          </div>
          <div>
            <span className="font-medium text-gray-700">Comfort:</span> 
            <span className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < option.comfort ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Type:</span> {option.directness}
          </div>
        </div>
        
        <p className="mt-4 text-gray-600">{option.description}</p>
      </div>
    </motion.div>
  );
}
