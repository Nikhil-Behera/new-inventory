const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');

const app = express();
const PORT = 3001; // A port that doesn't conflict with your frontend

// === Middleware ===
// Enable Cross-Origin Resource Sharing for all routes.
// We explicitly allow requests from the frontend's origin.
const corsOptions = {
  origin: 'http://localhost:5173', // Your frontend's address
};
app.use(cors(corsOptions));
// Enable parsing of JSON in request bodies
app.use(express.json());

// === Routes ===
// A simple test route to make sure the server is working
app.get('/api/health', (req, res) => {
  res.json({ message: 'Backend server is running!' });
});

// Use the auth routes for any requests to /api/auth
app.use('/api/auth', authRoutes);

// === Start the Server ===
app.listen(PORT, () => {
  console.log(`Backend server is listening on http://localhost:${PORT}`);
});
