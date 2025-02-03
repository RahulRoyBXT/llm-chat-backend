require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const http = require('http')
const {Server} = require('socket.io')

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

// initialize express app
connectDB();

const app = express();

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    },
    allowEIO3: true // Temporary compatibility fix
})

io.on('connection', (socket) => {
    console.log('Transport protocol:', socket.conn.transport.name);
    console.log("A User is connected", socket.id)

    socket.on("message", (data) => {
        if(data.startsWith('gpt')|| data.startsWith('GPT')|| data.startsWith('Gpt')){
            const FilteredData = data.toLocaleLowerCase().substring(3, data.length).trimStart()
            return socket.emit("message", `I am a bot, I am not able to process your request. Is this your request? ${FilteredData}`) // Emit to the user who sent the message
        }
        if(data === 'hi'){
            // socket.broadcast.emit("message", data) // Broadcast to all users
            return socket.emit("message", "Hello, how can I help you?") // Emit to the user who sent the message
        }
        socket.broadcast.emit("message", data) // Broadcast to all users
    })

    socket.on("disconnect", () => {
        console.log("User disconnected", socket.id)
})
})


// middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

// error handler
app.use(errorHandler)

// routes
app.use('/api/users', require('./routes/userRoutes'));

// server

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {console.log(`Server is running on port http://localhost:${PORT}`)});

