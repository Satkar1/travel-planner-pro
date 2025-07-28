'use client';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function TravelChart({ recommendations }) {
  if (!recommendations || recommendations.length === 0) return null;

  // Extract numeric values from price ranges (take the average)
  const priceData = recommendations.map(option => {
    const prices = option.priceRange.match(/\$(\d+).*\$(\d+)/) || 
                  option.priceRange.match(/\$(\d+)/);
    if (prices && prices.length >= 2) {
      return prices.length === 3 ? 
        (parseInt(prices[1]) + parseInt(prices[2])) / 2 :
        parseInt(prices[1]);
    }
    return 0;
  });

  // Extract numeric values from duration (convert to minutes)
  const durationData = recommendations.map(option => {
    const matches = option.duration.match(/(\d+)h\s*(\d*)m?/);
    if (matches) {
      const hours = parseInt(matches[1]) || 0;
      const minutes = parseInt(matches[2]) || 0;
      return hours * 60 + minutes;
    }
    return 0;
  });

  const modes = recommendations.map(option => option.mode);

  const priceChartData = {
    labels: modes,
    datasets: [
      {
        label: 'Average Price (USD)',
        data: priceData,
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(239, 68, 68, 0.7)',
          'rgba(234, 179, 8, 0.7)'
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(234, 179, 8, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const durationChartData = {
    labels: modes,
    datasets: [
      {
        label: 'Duration (minutes)',
        data: durationData,
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Price Comparison</h3>
        <div className="h-64">
          <Bar 
            data={priceChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Duration Comparison</h3>
        <div className="h-64">
          <Bar 
            data={durationChartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}