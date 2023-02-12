require('dotenv').config();
const connectDataBase = require('./config/db');

const User = require('./models/User');
const userData = require('./utils/user');
const Category = require('./models/Category');
const categoryData = require('./utils/category');
const News = require('./models/News');
const newsData = require('./utils/news');

connectDataBase();

const importData = async () => {
    try {

        await User.deleteMany();
        await User.insertMany(userData);

        await Category.deleteMany();
        await Category.insertMany(categoryData);

        await News.deleteMany();
        await News.insertMany(newsData);

        console.log('Data inserted successfully!');
        process.exit();

    } catch (error) {
        console.log('error', error);
        process.exit(1);
    }
};

importData();