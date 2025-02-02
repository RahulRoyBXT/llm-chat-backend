require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

// initialize express app
connectDB();

const app = express();

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

app.listen(PORT, () => {console.log(`Server is running on port http://localhost:${PORT}`)});

