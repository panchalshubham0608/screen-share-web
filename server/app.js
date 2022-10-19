const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http').createServer(app);
const { screenshot } = require('./util');
const path = require('path');

// configurations
const whitelist = [
    'http://localhost:3000',
    'http://localhost:8000',
];
const io = require('socket.io')(http, {
    cors: {
        origin: whitelist
    }
})
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// setup routes
app.get('/', (_, res) => {
    res.send('Hello World!');
});

io.on('connection', (socket) => {
    socket.on('screenshot', () => {
        screenshot()
        .then(data => socket.emit('screenshot', data))
        .catch(err => socket.emit('screenshot_error', err.toString()));
    });
});


// listen to the requests
const port = process.env.PORT || 8000;
http.listen(port, ()=> {
    console.log(`Server listening at http://localhost:${port}`);
});
