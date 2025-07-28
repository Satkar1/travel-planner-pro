export default function CityInput({ source, destination, setSource, setDestination, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="source" className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <input
            id="source"
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="New York"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <input
            id="destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Paris"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition duration-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
      >
        {loading ? 'Planning your trip...' : 'Get Travel Recommendations'}
      </button>
    </form>
  );
}