const initSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // Listen for SOS alerts
    socket.on('trigger-sos', (data) => {
      console.log(`SOS Alert triggered by ${socket.id}`, data);
      // Broadcast the SOS alert to all other connected clients
      socket.broadcast.emit('sos-alert', {
        senderId: socket.id,
        location: data.location,
        timestamp: new Date().toISOString()
      });
    });

    // Listen for Live Tracking Updates
    socket.on('update-location', (data) => {
      socket.broadcast.emit('user-location-updated', {
        senderId: socket.id,
        location: data.location
      });
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};

module.exports = { initSocket };
