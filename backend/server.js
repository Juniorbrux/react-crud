require('dotenv').config();
const express = require('express');
const studentRoutes = require('./src/routes/registerRoutes');
const authRoutes= require('./src/routes/authRoutes')
const picRoutes = require('./src/routes/uploadRoutes');
const bodyParser = require('body-parser');

// Import other route files as needed

const app = express();
const cors = require('cors'); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use(cors({
    origin: 'http://localhost:3000', // Replace with your frontend's origin
  }));
app.use('/api/students', studentRoutes);
app.use('/api/auth', authRoutes); 
app.use('/picture', picRoutes);

// Use other routes as needed

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
module.exports = app;
