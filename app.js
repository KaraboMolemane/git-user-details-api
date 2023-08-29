const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Use Helmet!
app.use(helmet());

app.get("/", (req, res) => {
    res.send("Hello world! Our app is now wearing a Helmet for security reasons.");
});

app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})