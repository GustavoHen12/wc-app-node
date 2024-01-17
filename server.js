require('dotenv').config();
const express = require("express");
const app = express();
const db = require("./config/db");
const consign = require("consign");

consign()
    // .include("./config/passport.js")
    .then("./config/middleware.js")
    .then("./api")
    .then("./config/routes.js")
    .into(app);

app.db = db;

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server executando no port:${PORT}`);
})