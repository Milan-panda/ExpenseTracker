const router = require("express").Router();
const Bill = require("../models/bills");

router.post("/", async (req, res) => {
  const newBill = new Bill(req.body);
  try {
    const addedBill = await newBill.save();
    res.status(200).json(addedBill);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) =>{
  try {
    const bills = await Bill.find({ email: req.query.email });
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).send({message: "Internal Server Error"})
  }
})

module.exports = router;