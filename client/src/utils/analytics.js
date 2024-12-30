const logSearch = async (searchTerm, wasFound) => {
  try {
    await fetch('/api/analytics/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        searchTerm,
        wasFound,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      })
    });
  } catch (err) {
    console.error('Analytics error:', err);
    // Non-blocking - failures shouldn't affect user experience
  }
};

export { logSearch };
