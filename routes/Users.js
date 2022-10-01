const express = require("express");
const Users = require("../models/users.model");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtKey = "jnsdnfdju38h";

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
    await users.save().then((data) => {
      console.log(data);
      const token = jwt.sign({ userId: users._id }, jwtKey);
      res.send({ token });
    });
  } catch (error) {
    res.status(422).send(error.message);
  }
});

router.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).send({ error: "must provide email or password" });
  }
  const users = await Users.findOne({ email });
  if (!users) {
    return res.status(422).send({ error: "must provide email or password" });
  }
  try {
    await users.comparePassword(password);
    const token = jwt.sign({ userId: users._id }, jwtKey);
    res.send({ token });
  } catch (err) {
    return res.status(422).send({ error: "must provide email or password" });
  }
});

module.exports = router;
