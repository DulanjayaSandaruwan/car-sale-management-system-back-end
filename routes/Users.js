const express = require("express");
const Users = require("../models/users.model");
const router = express.Router();
const app = express();

app.use(express.json());

router.post("/register", async (req, res) => {
  try {
    const users = new Users({
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      password: req.body.password,
    });
    const response = await users.save();
    res.json(response);
    console.log(req.body);
  } catch (error) {
    res.status(422).send(error.message);
    console.log(req.body);
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.send("Err:" + err);
  }
});

router.get("/loginCheck", async (req, resp) => {
  try {
    let res = await Users.find();
    let response = undefined;
    res.forEach(async (e) => {
      if ((e.email === req.query.email) & (e.password === req.query.password)) {
        response = true;
      }
    });
    resp.json(response);
  } catch (err) {
    resp.json({ message: err });
  }
});

// router.post("/sign-in", async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(422).send({ error: "must provide email or password" });
//   }
//   const users = await Users.findOne({ email });
//   if (!users) {
//     return res.status(422).send({ error: "must provide email or password" });
//   }
//   try {
//     await users.comparePassword(password);
//   } catch (err) {
//     return res.status(422).send({ error: "must provide email or password" });
//   }
// });

module.exports = router;
