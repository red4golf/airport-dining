import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Map from './components/Map';
import Filter from './components/Filter';
import Search from './components/Search';
import AdminDashboard from './components/AdminDashboard';
import { logSearch } from './utils/analytics';

function App() {
  const [restaurants] = useState([
    {
      id: 1,
      name: "Africa Lounge",
      airport: "KSEA",
      type: "commercial",
      lat: 47.448161, // A Gates coordinates
      lng: -122.308087,
      terminal: "A",
      concourse: "A",
      security: "post",
      cuisine: "African/American",
      priceRange: "$$",
      description: "Full-service bar and dining featuring African-inspired cuisine",
      hours: "4:30am - 10:30pm",
      features: ["Full Bar", "Table Service", "Vegetarian Options"],
      location: "A Gates, Near A5"
    },
    {
      id: 9,
      name: "Bigfoot Food Court",
      airport: "KSEA",
      type: "commercial",
      lat: 47.447250,
      lng: -122.308500,
      terminal: "Central",
      concourse: "Central Terminal",
      security: "post",
      cuisine: "Food Court",
      priceRange: "$$",
      description: "Multiple dining options in one location",
      hours: "4:00am - 11:00pm",
      features: ["Multiple Options", "Quick Service"],
      location: "Central Terminal, Level 2"
    },
    {
      id: 10,
      name: "Camden Food Co.",
      airport: "KSEA",
      type: "commercial",
      lat: 47.446800,
      lng: -122.309100,
      terminal: "B",
      concourse: "B",
      security: "post",
      cuisine: "American/Healthy",
      priceRange: "$$",
      description: "Fresh, healthy options including salads and sandwiches",
      hours: "4:30am - 10:30pm",
      features: ["Healthy Options", "Grab and Go"],
      location: "B Gates"
    },
    {
      id: 11,
      name: "Capitol Hill Food Hall",
      airport: "KSEA",
      type: "commercial",
      lat: 47.447500,
      lng: -122.308900,
      terminal: "A",
      concourse: "A",
      security: "post",
      cuisine: "Various",
      priceRange: "$$",
      description: "Local Seattle favorites in food hall setting",
      hours: "4:00am - 11:00pm",
      features: ["Local Vendors", "Multiple Options"],
      location: "A Gates"
    },
    {
      id: 2,
      name: "Beecher's Handmade Cheese",
      airport: "KSEA",
      type: "commercial",
      lat: 47.443974, // C Gates coordinates
      lng: -122.309195,
      terminal: "C",
      concourse: "C",
      security: "post",
      cuisine: "American/Deli",
      priceRange: "$$",
      description: "Seattle's famous artisan cheese shop featuring grilled cheese sandwiches and mac & cheese",
      hours: "4:30am - 10:30pm",
      features: ["Quick Service", "Local Favorite", "Grab and Go"],
      location: "C Gates, Near C3"
    },
    {
      id: 3,
      name: "Dungeness Bay Seafood House",
      airport: "KSEA",
      type: "commercial",
      lat: 47.445931, // Central Terminal coordinates
      lng: -122.308831,
      terminal: "Central",
      concourse: "Central Terminal",
      security: "post",
      cuisine: "Seafood/Pacific Northwest",
      priceRange: "$$$",
      description: "Fresh Pacific Northwest seafood featuring local Dungeness crab",
      hours: "5:00am - 11:00pm",
      features: ["Full Bar", "Table Service", "Local Seafood", "Views"],
      location: "Central Terminal, Main Level"
    },
    {
      id: 6,
      name: "Lucky Louie Fish Shack",
      airport: "KSEA",
      type: "commercial",
      lat: 47.443974,
      lng: -122.309195,
      terminal: "D",
      concourse: "D",
      security: "post",
      cuisine: "Seafood",
      priceRange: "$$",
      description: "Local fish & chips and seafood specialties",
      hours: "4:00am - 10:00pm",
      features: ["Quick Service", "Local Seafood"],
      location: "D Gates"
    },
    {
      id: 7,
      name: "Floret by Cafe Flora",
      airport: "KSEA",
      type: "commercial",
      lat: 47.448161,
      lng: -122.308087,
      terminal: "A",
      concourse: "A",
      security: "post",
      cuisine: "Vegetarian",
      priceRange: "$$",
      description: "Vegetarian and vegan restaurant from Seattle's Cafe Flora",
      hours: "4:30am - 10:30pm",
      features: ["Full Service", "Vegetarian", "Vegan Options"],
      location: "A Gates"
    },
    {
      id: 8,
      name: "Starbucks",
      airport: "KSEA",
      type: "commercial",
      lat: 47.443974,
      lng: -122.309195,
      terminal: "Central",
      concourse: "Central Terminal",
      security: "pre",
      cuisine: "Coffee/Pastries",
      priceRange: "$$",
      description: "Seattle-based coffee chain",
      hours: "4:00am - 11:00pm",
      features: ["Quick Service", "Grab and Go"],
      location: "Central Terminal, Pre-Security"
    },
    {
      id: 4,
      name: "The Hub",
      airport: "KTIW",
      type: "regional",
      lat: 47.268194,  // Actual TIW restaurant coordinates
      lng: -122.578028,
      description: "Tacoma Narrows Aviation's in-house restaurant",
      hours: "Daily 7am - 3pm",
      cuisine: "American",
      priceRange: "$$",
      terminal: "Main Terminal",
      security: "pre",
      features: ["Runway Views", "Full Menu", "Breakfast"],
      location: "Main Terminal Building"
    },
    {
      id: 5,
      name: "Amelia's Hangar Restaurant and Lounge",
      airport: "KPWT",
      type: "regional",
      lat: 47.492194,  // Actual PWT restaurant coordinates
      lng: -122.764833,
      description: "Bremerton National Airport's on-field restaurant",
      hours: "Open daily, Breakfast and Lunch",
      cuisine: "American",
      priceRange: "$$",
      terminal: "Main Terminal",
      security: "pre",
      features: ["Airport Views", "Full Menu", "Lounge"],
      location: "Main Terminal Building"
    },
    {
      id: 12,
      name: "Rel'Lish Burger Lounge",
      airport: "KSEA",
      type: "commercial",
      lat: 47.448730,
      lng: -122.308520,
      terminal: "B",
      concourse: "B",
      gate: "B4",
      security: "post",
      cuisine: "Burgers",
      priceRange: "$$",
      description: "Chef Kathy Casey's gourmet burger concept featuring local ingredients",
      hours: "4:00am - 10:00pm",
      features: ["Full Bar", "Table Service", "Local Ingredients"],
      location: "B Gates, Near Gate B4"
    },
    {
      id: 13,
      name: "Dish D'Lish",
      airport: "KSEA",
      type: "commercial",
      lat: 47.449120,
      lng: -122.308890,
      terminal: "C",
      concourse: "C",
      gate: "C2",
      security: "post",
      cuisine: "American/Healthy",
      priceRange: "$$",
      description: "Fresh grab-and-go options by Chef Kathy Casey",
      hours: "4:00am - 10:00pm",
      features: ["Quick Service", "Healthy Options", "Grab and Go"],
      location: "C Gates, Near Gate C2"
    },
    {
      id: 14,
      name: "Stone House Cafe",
      airport: "KSEA",
      type: "commercial",
      lat: 47.447890,
      lng: -122.309120,
      terminal: "Central",
      concourse: "Central Terminal",
      gate: null,
      security: "pre",
      cuisine: "Coffee/Pastries",
      priceRange: "$$",
      description: "Local coffee and fresh baked goods",
      hours: "4:00am - 11:00pm",
      features: ["Quick Service", "Local Coffee", "Fresh Pastries"],
      location: "Central Terminal, Ticketing Level"
    },
    {
      id: 15,
      name: "Trail Head BBQ",
      airport: "KSEA",
      type: "commercial",
      lat: 47.448350,
      lng: -122.308670,
      terminal: "N",
      concourse: "N Gates",
      gate: "N7",
      security: "post",
      cuisine: "BBQ",
      priceRange: "$$",
      description: "Pacific Northwest-inspired barbecue",
      hours: "6:00am - 10:00pm",
      features: ["Full Bar", "Table Service", "Local Specialties"],
      location: "N Gates, Near Gate N7"
    },
    {
      id: 16,
      name: "Seattle Made",
      airport: "KSEA",
      type: "commercial",
      lat: 47.448200,
      lng: -122.308100,
      terminal: "A",
      concourse: "A",
      gate: "A6",
      security: "post",
      cuisine: "Local/Various",
      priceRange: "$$",
      description: "Marketplace featuring local Seattle food vendors and products",
      hours: "4:00am - 10:00pm",
      features: ["Local Products", "Quick Service", "Grab and Go"],
      location: "A Gates, Near Gate A6"
    },
    {
      id: 17,
      name: "Marché",
      airport: "KSEA",
      type: "commercial",
      lat: 47.447100,
      lng: -122.308700,
      terminal: "B",
      concourse: "B",
      gate: "B4",
      security: "post",
      cuisine: "French/Market",
      priceRange: "$$",
      description: "French-inspired market and café",
      hours: "5:00am - 10:00pm",
      features: ["Fresh Food", "Wine Selection", "Grab and Go"],
      location: "B Gates, Next to Gate B4"
    },
    {
      id: 18,
      name: "Le Provençal",
      airport: "KSEA",
      type: "commercial",
      lat: 47.444100,
      lng: -122.309300,
      terminal: "C",
      concourse: "C",
      gate: "C10",
      security: "post",
      cuisine: "French",
      priceRange: "$$$",
      description: "Traditional French restaurant with Northwest influences",
      hours: "6:00am - 10:00pm",
      features: ["Full Service", "Wine Selection", "Full Bar"],
      location: "C Gates, Near Gate C10"
    },
    {
      id: 19,
      name: "Best of Beecher's",
      airport: "KSEA",
      type: "commercial",
      lat: 47.443800,
      lng: -122.309500,
      terminal: "D",
      concourse: "D",
      gate: "D3",
      security: "post",
      cuisine: "American/Deli",
      priceRange: "$$",
      description: "Famous Seattle cheese shop featuring sandwiches and mac & cheese",
      hours: "4:30am - 10:30pm",
      features: ["Quick Service", "Local Favorite", "Grab and Go"],
      location: "D Gates, Near Gate D3"
    },
    {
      id: 20,
      name: "Bambuza Vietnam Kitchen",
      airport: "KSEA",
      type: "commercial",
      lat: 47.448400,
      lng: -122.308750,
      terminal: "N",
      concourse: "N Gates",
      gate: "N16",
      security: "post",
      cuisine: "Vietnamese",
      priceRange: "$$",
      description: "Fresh Vietnamese cuisine with local ingredients",
      hours: "4:30am - 11:00pm",
      features: ["Full Service", "Bar", "Vegetarian Options"],
      location: "N Gates Satellite, Near Gate N16"
    },
    {
      id: 21,
      name: "Tap & Pour",
      airport: "KSEA",
      type: "commercial",
      lat: 47.442900,
      lng: -122.309700,
      terminal: "S",
      concourse: "S Gates",
      gate: "S9",
      security: "post",
      cuisine: "American/Bar",
      priceRange: "$$",
      description: "Local craft beers and pub fare",
      hours: "6:00am - 11:00pm",
      features: ["Full Bar", "Local Beers", "Table Service"],
      location: "S Gates Satellite, Near Gate S9"
    },
    {
      id: 22,
      name: "Elliott's Oyster House",
      airport: "KSEA",
      type: "commercial",
      lat: 47.445800,
      lng: -122.309000,
      terminal: "Central",
      concourse: "Central Terminal",
      gate: null,
      security: "post",
      cuisine: "Seafood",
      priceRange: "$$$",
      description: "Seattle's famous seafood restaurant featuring fresh local oysters",
      hours: "5:00am - 10:00pm",
      features: ["Full Service", "Fresh Seafood", "Full Bar", "Views"],
      location: "Central Terminal, Main Level"
    },
    {
      id: 23,
      name: "Ellie's at the Airport",
      airport: "KAWO",
      type: "regional",
      lat: 48.161111,
      lng: -122.158889,
      terminal: "Main Terminal",
      security: "pre",
      cuisine: "American",
      priceRange: "$$",
      description: "Restaurant and bar at Arlington Municipal Airport",
      hours: "7:00am - 3:00pm",
      features: ["Breakfast", "Lunch", "Runway Views"],
      location: "Main Terminal Building"
    },
    {
      id: 24,
      name: "Spruce Goose Cafe",
      airport: "0S9",
      type: "regional",
      lat: 48.053333,
      lng: -122.810556,
      terminal: "Main Terminal",
      security: "pre",
      cuisine: "American",
      priceRange: "$$",
      description: "Jefferson County International Airport restaurant with views of Olympic Mountains",
      hours: "7:00am - 3:00pm",
      features: ["Breakfast", "Lunch", "Mountain Views", "Local Favorite"],
      location: "Terminal Building"
    },
    {
      id: 25,
      name: "Greedy Cow Burger",
      airport: "KSEA",
      type: "commercial",
      lat: 47.445100,
      lng: -122.309100,
      terminal: "D",
      concourse: "D",
      gate: "D5",
      security: "post",
      cuisine: "Burgers",
      priceRange: "$$",
      description: "Premium burgers featuring local beef",
      hours: "4:00am - 10:00pm",
      features: ["Quick Service", "Local Ingredients"],
      location: "D Gates, Near Gate D5"
    },
    {
      id: 26,
      name: "La Plaza",
      airport: "KSEA",
      type: "commercial",
      lat: 47.446200,
      lng: -122.308900,
      terminal: "B",
      concourse: "B",
      gate: "B9",
      security: "post",
      cuisine: "Mexican",
      priceRange: "$$",
      description: "Authentic Mexican cuisine",
      hours: "4:30am - 10:30pm",
      features: ["Full Bar", "Table Service"],
      location: "B Gates, Near Gate B9"
    },
    {
      id: 27,
      name: "Mountain Room Bar",
      airport: "KSEA",
      type: "commercial",
      lat: 47.447300,
      lng: -122.308600,
      terminal: "S",
      concourse: "S Gates",
      gate: "S2",
      security: "post",
      cuisine: "American/Bar",
      priceRange: "$$",
      description: "Full-service bar with mountain views",
      hours: "10:00am - 11:00pm",
      features: ["Full Bar", "Mountain Views", "Local Beers"],
      location: "S Gates Satellite, Near Gate S2"
    }
  ]);
  
  const [mapView, setMapView] = useState(null);
  const [filteredRestaurants, setFilteredRestaurants] = useState(restaurants);
  const [currentFilters, setCurrentFilters] = useState({
    airport: 'all',
    terminal: 'all',
    concourse: 'all',
    cuisine: 'all',
    priceRange: 'all',
    security: 'all'
  });

  const airportCoordinates = {
    KSEA: { lat: 47.449889, lng: -122.309444, zoom: 15 },
    KTIW: { lat: 47.267778, lng: -122.578333, zoom: 14 },
    KPWT: { lat: 47.490278, lng: -122.765000, zoom: 14 },
    KAWO: { lat: 48.161111, lng: -122.158889, zoom: 14 },
    '0S9': { lat: 48.053333, lng: -122.810556, zoom: 14 }
  };

  const handleSearch = (airportCode) => {
    const airport = airportCoordinates[airportCode];
    const wasFound = !!airport;
    
    logSearch(airportCode, wasFound);
    
    if (wasFound) {
      setMapView({
        longitude: airport.lng,
        latitude: airport.lat,
        zoom: airport.zoom
      });
      setCurrentFilters({
        ...currentFilters,
        airport: airportCode
      });
    } else {
      alert('Airport not found in database');
    }
  };

  const handleFilterChange = (filters, mapView) => {
    setCurrentFilters(filters);
    if (mapView) {
      setMapView(mapView);
    }
    
    // Filter restaurants based on all criteria
    const filtered = restaurants.filter(restaurant => {
      const matchesAirport = filters.airport === 'all' || restaurant.airport === filters.airport;
      const matchesTerminal = filters.terminal === 'all' || restaurant.terminal === filters.terminal;
      const matchesCuisine = filters.cuisine === 'all' || restaurant.cuisine === filters.cuisine;
      const matchesPrice = filters.priceRange === 'all' || restaurant.priceRange === filters.priceRange;
      const matchesSecurity = filters.security === 'all' || restaurant.security === filters.security;

      return matchesAirport && matchesTerminal && matchesCuisine && matchesPrice && matchesSecurity;
    });

    setFilteredRestaurants(filtered);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="header-top">
            <h1>Airport Restaurants</h1>
            <nav className="main-nav">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/admin" className="nav-link admin-link">Admin Dashboard</Link>
            </nav>
          </div>
          {window.location.pathname === '/' && <Search onSearch={handleSearch} />}
        </header>
        
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={
            <main className="app-main">
              <Filter 
                restaurants={restaurants}
                onFilterChange={handleFilterChange}
                currentFilters={currentFilters}
              />
              <Map 
                restaurants={filteredRestaurants || restaurants}
                viewState={mapView}
              />
            </main>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;