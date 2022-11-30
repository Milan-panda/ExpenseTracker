const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");

//Create User(Register)
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if(error)
      return res.status(400).send({message: error.details[0].message})

    const user = await User.findOne({email:req.body.email})
    if(user)
      return res
      .status(409)
      .send({message: "User with this email already exist."})

    const salt = await bcrypt.genSalt(Number(process.env.SALT))
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    await new User ({...req.body, password: hashPassword}).save();
    res.status(201).send({message: "User Created Successfully"})
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Get User Details
router.get("/", async (req, res) => {
  try {
    res.status(200).send(await User.find({ email: req.query.email }));
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

//Edit User Details
router.put("/", async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const updateUser = await User.findByIdAndUpdate(
      { _id: req.query.id },
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete User
router.delete("/", async (req, res) => {
  try {
    res.setHeader("X-Foo", "bar");
    const user = await User.findByIdAndDelete({ _id: req.query.id });
    if (user) {
      res.status(200).send({ messsage: "User Deleted Successfully" });
    } else {
      res.send({ message: "user not found" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
