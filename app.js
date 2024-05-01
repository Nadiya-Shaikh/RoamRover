const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT = 8080;
const MONGO_URL = "mongodb://127.0.0.1:27017/RoamRover";

main()
    .then(() => console.log('mongodb connected successfully!'))
    .catch((err) => console.log("ERORR - ", err));

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.get('/', (req, res) => {
    res.send('Home');
});
app.listen(PORT, () => {
    console.log('server is listening to port: 8080');
});