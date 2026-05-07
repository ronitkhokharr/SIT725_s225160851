const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let users = [];

io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('joinDashboard', (username) => {
        users.push({
            id: socket.id,
            username: username,
            status: 'Available'
        });

        io.emit('updateUsers', users);
        io.emit('notification', `${username} joined the dashboard`);
    });

    socket.on('changeStatus', (data) => {
        users = users.map(user => {
            if (user.id === socket.id) {
                user.status = data.status;
            }
            return user;
        });

        io.emit('updateUsers', users);
    });

    socket.on('disconnect', () => {
        const disconnectedUser = users.find(user => user.id === socket.id);

        if (disconnectedUser) {
            io.emit('notification', `${disconnectedUser.username} left the dashboard`);
        }

        users = users.filter(user => user.id !== socket.id);
        io.emit('updateUsers', users);

        console.log('User disconnected');
    });
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});