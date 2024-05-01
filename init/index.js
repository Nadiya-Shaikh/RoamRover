const mongoose = require('mongoose');
const MONGO_URL = "mongodb://127.0.0.1:27017/TheRoamRover";
const initData = require('./data');
const Listing = require('../models/listing');

main()
    .then(() => console.log('mongodb connected successfully!'))
    .catch((err) => console.log("ERORR - ", err));

async function main() {
    await mongoose.connect(MONGO_URL);
};

const initDB = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log('data saved successfully!');
}

initDB();