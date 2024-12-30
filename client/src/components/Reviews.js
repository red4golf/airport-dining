import React from 'react';

function Reviews({ selectedRestaurant, restaurants }) {
  if (!selectedRestaurant) {
    return <div className="reviews-container"><p>Select a restaurant to see reviews</p></div>;
  }

  // Get reviews from the selected restaurant's data
  const restaurant = restaurants.find(r => r.id === selectedRestaurant.id);
  const reviews = restaurant?.reviews || [];

  return (
    <div className="reviews-container">
      <h2>Reviews for {selectedRestaurant.name}</h2>
      <div className="reviews-list">
        {reviews.map(review => (
          <div key={review.id} className="review-item">
            <div className="review-header">
              <span className="rating">{'⭐'.repeat(review.rating)}</span>
              <span className="date">{new Date(review.date).toLocaleDateString()}</span>
            </div>
            <p className="review-text">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reviews;