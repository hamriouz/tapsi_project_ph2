const setupDb = require("./DataAccess/db/db-setup");
const express = require("express");

setupDb();

const app = express();
app.use(express.json());

app.listen(2000)

module.exports = {app};

