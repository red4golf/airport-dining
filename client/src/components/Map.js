import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup, NavigationControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

function MapComponent({ restaurants, viewState: providedViewState }) {
  const [viewState, setViewState] = useState({
    longitude: -122.5,  // Center on WA
    latitude: 47.2,
    zoom: 8
  });

  const [popupInfo, setPopupInfo] = useState(null);  // Add popup state

  // Update view when filters change
  useEffect(() => {
    if (providedViewState) {
      setViewState(providedViewState);
    }
  }, [providedViewState]);

  const getPinColor = (priceRange) => {
    switch(priceRange) {
      case '$': return '#4CAF50';
      case '$$': return '#FFC107';
      case '$$$': return '#F44336';
      default: return '#2196F3';
    }
  };

  const getPopupContent = (restaurant) => {
    const isCommercial = restaurant.type === 'commercial';
    return (
      <div className="info-window">
        <h3>{restaurant.name}</h3>
        <p>{restaurant.description}</p>
        {isCommercial ? (
          <>
            <p><strong>Location:</strong> Terminal {restaurant.terminal}, Gate {restaurant.gate}</p>
            <p><strong>Security:</strong> {restaurant.security === 'post' ? 'Post' : 'Pre'}-Security</p>
          </>
        ) : (
          <p><strong>Hours:</strong> {restaurant.hours}</p>
        )}
        <p><strong>Price Range:</strong> {restaurant.priceRange}</p>
        <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
      </div>
    );
  };

  return (
    <div className="map-container">
      <ReactMapGL
        {...viewState}
        onMove={evt => setViewState(evt.viewState)}
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle="mapbox://styles/mapbox/light-v11"
      >
        <NavigationControl position="top-right" />
        
        {restaurants.map((restaurant) => (
          <Marker
            key={restaurant.id}
            longitude={restaurant.lng}
            latitude={restaurant.lat}
            anchor="bottom"
            onClick={e => {
              e.originalEvent.stopPropagation();
              setPopupInfo(restaurant);
            }}
          >
            <div 
              style={{
                width: '24px',
                height: '24px',
                background: getPinColor(restaurant.priceRange),
                borderRadius: '50%',
                border: '2px solid white',
                cursor: 'pointer',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}
            />
          </Marker>
        ))}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={popupInfo.lng}
            latitude={popupInfo.lat}
            onClose={() => setPopupInfo(null)}
          >
            {getPopupContent(popupInfo)}
          </Popup>
        )}
      </ReactMapGL>
    </div>
  );
}

export default MapComponent;