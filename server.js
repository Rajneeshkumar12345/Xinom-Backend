// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const formRoutes = require('./routes/formRoutes');

// dotenv.config();


// const app = express();

// connectDB();

// app.use(cors());
// app.use(express.json());
// app.use('/api/form', formRoutes);

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const dotenv = require('dotenv');
const formRoutes = require('./routes/formRoutes');

// Load environment variables from .env file
dotenv.config();

// Initialize express app
const app = express();

// Connect to MongoDB
connectDB();

// CORS configuration to accept requests from the frontend URL
const allowedOrigins = ['https://xinom-front.vercel.app'];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Route for handling form-related requests
app.use('/api/form', formRoutes);

// Port from environment variable or default to 4000
const PORT = process.env.PORT || 4000;

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// Basic error handling for unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Unhandled Rejection: ${err.message}`);
  // Close the server and exit process
  server.close(() => process.exit(1));
});

