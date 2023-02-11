require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDataBase = require('../config/db');
const userRoutes = require('../routes/userRoutes');
const categoryRoutes = require('../routes/categoryRoutes');
const newsRoutes = require('../routes/newsRoutes');
const formData = require('express-form-data');
//const { isAuth } = require('../config/auth');

connectDataBase();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(formData.parse());
app.use(cors());

//root route
app.get('/', (req, res) => {
    res.send('App works properly!');
});

//routes
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/news', newsRoutes);

// Use express's default error handling middleware
app.use((err, req, res, next) => {
    if (res.headersSent) return next(err);
    res.status(400).json({ message: err.message });
});

const PORT = process.env.PORT || 1000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));