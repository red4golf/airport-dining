import React, { useState, useEffect } from 'react';

function Filter({ restaurants = [], onFilterChange }) {
  const [selectedAirport, setSelectedAirport] = useState('all');
  const [filters, setFilters] = useState({
    airport: 'all',
    terminal: 'all',
    concourse: 'all',
    cuisine: 'all',
    priceRange: 'all',
    security: 'all'
  });

  const airportTypes = {
    KSEA: 'commercial',
    KTIW: 'regional',
    KPWT: 'regional',
    KAWO: 'regional',
    '0S9': 'regional'
  };

  // Get available cuisines for selected airport
  const getAvailableCuisines = () => {
    if (filters.airport === 'all') {
      return [...new Set(restaurants.map(r => r.cuisine))];
    }
    return [...new Set(
      restaurants
        .filter(r => r.airport === filters.airport)
        .map(r => r.cuisine)
    )];
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    
    if (name === 'airport') {
      setSelectedAirport(value);
      // Reset cuisine if changing airports
      newFilters.cuisine = 'all';
      if (value === 'all') {
        onFilterChange(newFilters, {
          longitude: -122.5,
          latitude: 47.2,
          zoom: 8
        });
      } else {
        const airport = restaurants.find(r => r.airport === value);
        if (airport) {
          onFilterChange(newFilters, {
            latitude: airport.lat,
            longitude: airport.lng,
            zoom: value === 'KSEA' ? 15 : 13
          });
        }
      }
    }
    
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  // Get airport-specific options
  const selectedAirportType = selectedAirport !== 'all' ? airportTypes[selectedAirport] : null;

  return (
    <div className="filter-container">
      <h2>Airport Restaurants</h2>
      <div className="filter-options">
        <select name="airport" onChange={handleFilterChange} value={filters.airport}>
          <option value="all">All Airports</option>
          <option value="KSEA">Seattle-Tacoma Int'l (KSEA)</option>
          <option value="KTIW">Tacoma Narrows (KTIW)</option>
          <option value="KPWT">Bremerton National (KPWT)</option>
          <option value="KAWO">Arlington Municipal (KAWO)</option>
          <option value="0S9">Jefferson County Int'l (0S9)</option>
        </select>

        {selectedAirportType === 'commercial' && (
          <>
            <select name="terminal" onChange={handleFilterChange} value={filters.terminal}>
              <option value="all">All Terminals</option>
              <option value="A">Terminal A</option>
              <option value="B">Terminal B</option>
              <option value="C">Terminal C</option>
              <option value="D">Terminal D</option>
            </select>

            <select name="security" onChange={handleFilterChange} value={filters.security}>
              <option value="all">All Areas</option>
              <option value="pre">Pre-Security</option>
              <option value="post">Post-Security</option>
            </select>
          </>
        )}
        
        <select name="cuisine" onChange={handleFilterChange} value={filters.cuisine}>
          <option value="all">All Cuisines</option>
          {getAvailableCuisines().map(cuisine => (
            <option key={cuisine} value={cuisine}>{cuisine}</option>
          ))}
        </select>
        
        <select name="priceRange" onChange={handleFilterChange} value={filters.priceRange}>
          <option value="all">All Prices</option>
          <option value="$">$</option>
          <option value="$$">$$</option>
          <option value="$$$">$$$</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;