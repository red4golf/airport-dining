const API_BASE_URL = 'http://localhost:5000/api';

export const fetchRestaurants = async () => {
  const response = await fetch(`${API_BASE_URL}/restaurants`);
  return response.json();
};

export const submitReview = async (restaurantId, reviewData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/restaurants/${restaurantId}/reviews`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error submitting review:', error);
    throw error;
  }
};