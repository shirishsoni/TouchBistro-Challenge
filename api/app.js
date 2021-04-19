const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { response } = require('express');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const router = require("./primeNumbers")
app.use(router)

app.listen(4000,function(){
    console.log("Listening");
});

module.exports = app