import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';

const AdminDashboard = () => {
  const [analyticsData, setAnalyticsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/analytics/report');
      if (!response.ok) throw new Error('Failed to fetch analytics');
      const data = await response.json();
      setAnalyticsData(data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="admin-dashboard">
      <h2>Search Analytics Dashboard</h2>
      
      <div className="analytics-summary">
        <div className="stat-card">
          <h3>Total Searches</h3>
          <p>{analyticsData.reduce((acc, curr) => acc + curr.count, 0)}</p>
        </div>
        <div className="stat-card">
          <h3>Unique Airports</h3>
          <p>{analyticsData.length}</p>
        </div>
        <div className="stat-card">
          <h3>Success Rate</h3>
          <p>
            {Math.round(
              (analyticsData.reduce((acc, curr) => acc + curr.successRate, 0) / 
              analyticsData.length) * 100
            )}%
          </p>
        </div>
      </div>

      <div className="chart-container">
        <h3>Search Frequency by Airport</h3>
        <BarChart width={800} height={400} data={analyticsData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" fill="#8884d8" name="Search Count" />
          <Bar 
            dataKey="successRate" 
            fill="#82ca9d" 
            name="Success Rate" 
            yAxisId={1}
          />
        </BarChart>
      </div>

      <div className="search-table">
        <h3>Detailed Search Data</h3>
        <table>
          <thead>
            <tr>
              <th>Airport Code</th>
              <th>Search Count</th>
              <th>Success Rate</th>
            </tr>
          </thead>
          <tbody>
            {analyticsData.map(item => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.count}</td>
                <td>{Math.round(item.successRate * 100)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
