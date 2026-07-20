const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Import modular services and routes
const { initSocket } = require('./src/services/socketService');
const apiRoutes = require('./src/routes/apiRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Set up server and WebSockets
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  }
});
initSocket(io);

// Mount API routes
app.use('/api', apiRoutes);

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/safeher')
  .then(() => {
    console.log('Connected to MongoDB');
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
