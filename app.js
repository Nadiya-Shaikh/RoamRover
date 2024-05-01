const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/TheRoamRover";
const Listing = require('./models/listing');
const path = require('path');

main()
    .then(() => console.log('mongodb connected successfully!'))
    .catch((err) => console.log("ERORR - ", err));

async function main() {
    await mongoose.connect(MONGO_URL);
};

// //check listing
// app.get('/testListing', async (req, res) => {
//     const sampleListing = new Listing({
//         title: 'Villa',
//         description: 'By the beach',
//         image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZTJ9PiXYRPBIWO2maHbR9UZHFId3Jj0aDTYR6uXROOA&s',
//         price: 2000,
//         location: 'Calangute, Goa',
//         country: 'India',
//     });
//     await sampleListing.save();
//     res.send('testing successful')
//     console.log('listing saved');

// });


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//index route
app.get('/listings',async(req,res)=>{
    try{
        const allListings = await Listing.find({});
        res.render("listings/index.ejs", {allListings});
    }catch(err){
        console.log(err);
    }  
  
});
app.get('/', (req, res) => {
    res.send('Home');
});
app.listen(PORT, () => {
    console.log('server is listening to port: 8080');
});