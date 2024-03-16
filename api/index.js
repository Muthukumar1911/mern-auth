import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js';
import authRoute from './routes/auth.route.js';
import bodyParser from 'body-parser';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using the URI from environment variables
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB!');
    console.log('MongoDB URI:', process.env.MONGO);
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

const app = express();
app.use(express.json()); // Add this line to parse JSON request bodies

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoute);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal server error'
  return res.status(statusCode).json({
    success : false,
    message,
    statusCode
  })
})