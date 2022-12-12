const express = require("express");
const routes = require('./routes/tea') // import the routes
const mongoose = require('mongoose');
require('dotenv').config();

//estabilish connection to database
mongoose.connect(
      'mongodb+srv://Victor:Welcome22@cluster0.waa6iem.mongodb.net/?retryWrites=true&w=majority',
    
    (err) => {
        if (err) return console.log("Error:", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    }
);
const app = express();


app.use(express.json()); // parses incoming requests with JSON payloads

app.use('/', routes)

const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})