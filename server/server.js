const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const analyticsRoutes = require('./routes/analytics');

const app = express();

app.use(cors());
app.use(express.json());

// Basic route for testing
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/airport-dining', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    console.log('✅ Connected to MongoDB');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    console.log('⏳ Retrying in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Initialize MongoDB connection
connectDB();

// Use routes only after successful DB connection
mongoose.connection.once('open', () => {
  app.use('/api/analytics', analyticsRoutes);
});

// Error handling for MongoDB connection loss
mongoose.connection.on('error', (err) => {
  console.error('MongoDB error:', err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`
🚀 Server running on port ${PORT}
📊 Analytics endpoint: http://localhost:${PORT}/api/analytics
🏥 Health check: http://localhost:${PORT}/health
  `);
});

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  });
});
