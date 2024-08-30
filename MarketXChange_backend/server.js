const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables from .env file
require('dotenv').config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS to allow requests from frontend
app.use(cors());

// Connect to MongoDB
connectDB();

// Create HTTP server and integrate Socket.IO
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000", // Allow the frontend to connect
        methods: ["GET", "POST"]
    }
});

// Set up Socket.IO connection
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

// Make io accessible to the bidding controller
app.set('io', io);

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/bidding', require('./routes/biddingRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));
app.use('/api/tokens', require('./routes/tokenRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error handling middleware (optional)
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Set the port from environment or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
