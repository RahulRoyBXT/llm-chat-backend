const mongoose = require('mongoose');


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to the database');
    } catch(error){
        console.log('Error connecting to the database. Exiting now...', error);
        process.exit();
    }
}
module.exports = connectDB;