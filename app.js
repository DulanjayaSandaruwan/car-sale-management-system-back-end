const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect(
    "mongodb+srv://admin:3BKLmJIBIyhA6jGr@cluster0.gexonlv.mongodb.net/Car-Sale-Management-System?retryWrites=true&w=majority"
  )

  .then(() => console.log("Connected To Database"))
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
// 3BKLmJIBIyhA6jGr
