const express = require("express");
const mongoose = require("mongoose");

const app = express();

// Bodyparser middleware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

console.log("hgfcvhjkklnhbgfcghkjnbvvbkjnvbcfvgjbhvb fhgvbj")

// Connect to MongoDB
mongoose
	.connect('mongodb://localhost:27017/mapapp', {useNewUrlParser: true})
	.then(() => console.log("MongoDB successfully connected"))
	.catch(err => console.log(err));

const port = process.env.PORT || 3000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));
