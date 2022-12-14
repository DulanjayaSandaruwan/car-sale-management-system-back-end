const express = require("express");
const Car = require("../models/car.model");
const router = express.Router();
const app = express();

app.use(express.json());

router.get("/", async (req, res) => {
  try {
    const car = await Car.find();
    res.json(car);
  } catch (err) {
    res.send("Err:" + err);
  }
});

router.get("/search", async (req, resp) => {
  try {
    console.log("location = " + req.query.location);
    let res = await Car.find();
    let temp = [];
    res.forEach(async (e) => {
      if ((e.date === req.query.date) | (e.location === req.query.location)) {
        console.log(e);
        temp.push(e);
      }
    });
    console.log("temp = " + temp);
    resp.json(temp);
  } catch (err) {
    resp.json({ message: err });
  }
});

// router.get("/:regNo", async (req, res) => {
//   try {
//     const car = await Car.findById(req.params.id);
//     res.json(car);
//   } catch (err) {
//     res.send("Err:" + err);
//   }
// });

router.post("/", async (req, res) => {
  const car = new Car({
    image: req.body.image,
    regNo: req.body.regNo,
    brand: req.body.brand,
    price: req.body.price,
    fuelType: req.body.fuelType,
    date: req.body.date,
    location: req.body.date,
  });
  try {
    console.log(req.body.image);
    const response = await car.save();
    res.json(response);
    console.log(req.body);
  } catch (err) {
    res.send("Err:" + err);
  }
});

router.put("/", async (req, resp) => {
  try {
    let res = await Car.find();
    let obj = undefined;
    let response = undefined;
    res.forEach(async (e) => {
      if (e.regNo === req.query.regNo) {
        obj = e;
        obj.image = req.body.image;
        obj.brand = req.body.brand;
        obj.price = req.body.price;
        obj.fuelType = req.body.fuelType;
        obj.date = req.body.date;
        obj.location = req.body.location;

        console.log("Obj = ", obj);
        response = e.save(obj);
      }
    });
    resp.json(await response);
  } catch (err) {
    resp.json({ "message : ": err });
  }
});

router.delete("/", async (req, resp) => {
  try {
    let arr = await Car.find();
    let response = undefined;
    arr.forEach(async (e) => {
      if (e.regNo === req.query.regNo) {
        response = await e.remove();
      }
    });
    resp.json(response);
  } catch (err) {
    resp.json({ "message : ": err });
  }
});

module.exports = router;
