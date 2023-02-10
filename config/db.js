require('dotenv').config();
const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        const connection = mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        console.log("Mongo Connected");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDatabase;