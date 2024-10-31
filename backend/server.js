const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path=require('path');
const dotenv = require('dotenv');
const userRoutes=require('./routes/userroute');
const contactRoutes = require('./routes/contactroute');
const productRoutes=require('./routes/productroutes');
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.log(err));

  app.use('/api/users', userRoutes);
  app.use('/api', contactRoutes);
  app.use('/api', productRoutes);


// Serve static files from the "uploads" directory 
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
