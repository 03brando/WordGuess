var express = require("express");
var app = express();
const path = require('path');

var HTTP_PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'public')));

const onHttpStart = () => console.log(`HTTP server is listening on port ${HTTP_PORT}`)

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"/views/index.html"));
});

app.listen(HTTP_PORT, onHttpStart);