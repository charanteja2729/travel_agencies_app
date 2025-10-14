// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./api/routes/users');
const agencyRoutes = require('./api/routes/agencies');
const bookingRoutes = require('./api/routes/bookings');

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(express.json());

// CORS: allow specific origins and Vercel preview domains.
// Add or remove allowedOrigins entries as needed.
const allowedOrigins = [
  'https://travel-agencies-bfafn993p-charan-tejas-projects-28ab2eb6.vercel.app',
  'https://travel-agencies-1jm6gopla-charan-tejas-projects-28ab2eb6.vercel.app',
  'https://travel-agencies-app.onrender.com' // if your frontend ever calls from this origin
];

// dynamic origin check: allow listed origins OR any vercel preview domain (*.vercel.app)
const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (mobile apps, curl, Postman, server-to-server, uptime pingers)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.includes(origin) || /\.vercel\.app$/.test(origin);
    if (isAllowed) {
      return callback(null, true);
    } else {
      // for browser requests, return an error so the preflight fails clearly
      return callback(new Error('CORS_NOT_ALLOWED_BY_SERVER'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
// Ensure preflight requests are handled
app.options('*', cors(corsOptions));

// Lightweight health check for uptime pingers (DO NOT put DB queries here)
app.get('/healthz', (req, res) => {
  // small log to make pings visible in Render logs (optional)
  console.log(`[HEALTHZ] ${new Date().toISOString()} - ping from ${req.get('x-forwarded-for') || req.ip}`);
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(), // seconds the process has been running
    timestamp: new Date().toISOString()
  });
});

// respond to HEAD requests too (some pingers use HEAD)
app.head('/healthz', (req, res) => res.status(200).end());

// Health route (useful for quick browser checks)
app.get('/', (req, res) => res.send('Backend is live!'));

// API routes
app.use('/api/users', userRoutes);
app.use('/api/agencies', agencyRoutes);
app.use('/api/bookings', bookingRoutes);

// MongoDB connection (support either MONGO_URI or MONGODB_URI env name)
const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/tourismAppDB';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Successfully connected to MongoDB.');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

// Basic error handler to show CORS errors in logs (optional)
app.use((err, req, res, next) => {
  if (err && err.message && err.message.indexOf('CORS_NOT_ALLOWED') !== -1) {
    console.warn('CORS blocked request from origin:', req.get('origin'));
    return res.status(403).json({ message: 'CORS blocked: this origin is not allowed.' });
  }
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
});
