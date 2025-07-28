export async function getTravelRecommendations(source, destination) {
  try {
    const response = await fetch('/api/travel', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ source, destination }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching travel recommendations:', error);
    throw error;
  }
}