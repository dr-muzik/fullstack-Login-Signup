const server = require('./app');
require('dotenv').config();
const { Server } = require('socket.io');

const PORT = process.env.PORT || 3000;

const expressServer = server.listen(PORT, () => {
    console.log(`server is running on port ${PORT}...`);
    console.log(process.env.NODE_ENV);
});

const io = new Server(expressServer, {
    cors: {
        origin: process.env.NODE_ENV === "production" ? false : ["http://localhost:5173", "http://127.0.0.1:5173"]
    }
})

const users = {};
io.on('connection', socket => {
    console.log(`User ${socket.id} connected`)

      // User authentication (simplified)
  socket.on('authenticate', (userId) => {
    console.log(`User ${socket.id} authenticated as ${userId}`);
    users[userId] = socket.id;
  });

  // upon connection - only to user
  socket.emit('welcome', "welcome to chat app");

  //upon connection - to all others except user that just connected
  socket.on('getUsername', (user) => {
    console.log(user);
      socket.broadcast.emit('others', `User ${user} is connected`)
  })


    //connecting users
    socket.on('message', data => {
        // Check if the sender is authenticated
        if (!users[data.userId]) {
            console.log(`User ${socket.id} is not authenticated.`);
            return;
        }
  
      console.log(`${users[data.userId]}: ${data.text}`);
      // Add the userId to the message before emitting
    //   const serializedMsg = { userId: users[data.userId], ...data };
      io.emit('message', data);
    });

    //disconnecting users
    socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
      });

      socket.on('off', () => {
        console.log(`User ${socket.id} disconnected`);
      });
})
