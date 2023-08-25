const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;
const app = express();
require("./helper/database")
require("./model/index.model")
let path = require("path");
let fs = require("fs");
let cors = require("cors");
let database = require("./helper/database");
database.initModels();
database.connect();

app.use(express.json());
app.use(cors())
require("./Routes/index")(app);



app.listen(PORT, () => {
  console.log(`Server connected on ${PORT}`);
});
