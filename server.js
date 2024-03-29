const express = require("express");
const app = express();
const helmet = require('helmet');
const compression = require('compression');
const routes = require('./routes/tea') // import the routes
const mongoose = require('mongoose');
require('dotenv').config();


app.use('/uploads', express.static('./uploads'));
app.use(helmet());

app.use(compression()); //Compresss all routes


//estabilish connection to database
mongoose.connect(
    process.env.MONGODB_URI
      ,
    
    (err) => {
        if (err) return console.log("Error:", err);
        console.log("MongoDB Connection -- Ready state is:", mongoose.connection.readyState);
    },
    
);



app.use(express.json()); // parses incoming requests with JSON payloads

app.use('/', routes)

.get(function (req, res) {
    res.sendFile(process.cwd() + '/index.html');
});

const listener = app.listen(process.env.PORT || 3333, () => {
    console.log('Your app is listening on port ' + listener.address().port)
})