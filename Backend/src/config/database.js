require('dotenv').config();
const mongoose = require('mongoose');


function connectDB() {
    mongoose.connect(process.env.MONGO_URI)
    .then(() => {
       console.log("Conntected to MongoDB")
    })
}

module.exports = connectDB;