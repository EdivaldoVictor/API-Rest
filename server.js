const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json()); // parses incoming requests with JSON payloads

app.get("/", (req, res) => {
    res.json({message: "Hello world!"});
});

app.listen(PORT, () =>
 console.log('Example app listening on port 3000'),
 );