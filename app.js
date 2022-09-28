const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/Users");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", router);

const port = 3000;

const url = "mongodb://localhost/car-sale-management-system";
mongoose.connect(url, { useNewUrlParser: true });
const con = mongoose.connection;

con.on("open", () => {
  console.log("MongoDB connected !");
});

app.listen(port, () => {
  console.log(`Express app is listening on port ${port}`);
});

// mongoose
//   .connect(
//     "mongodb+srv://Dulan:root@cluster0.637wwpq.mongodb.net/Car-Sale?retryWrites=true&w=majority"
//   )

//   .then(() => console.log("Connected To Database"))
//   .then(() => {
//     app.listen(3000);
//   })
//   .catch((err) => console.log(err));
