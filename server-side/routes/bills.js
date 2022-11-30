const router = require("express").Router();
const Bill = require("../models/bills");

//Add Bill
router.post("/", async (req, res) => {
  const newBill = new Bill(req.body);
  try {
    const addedBill = await newBill.save();
    res.status(200).json(addedBill);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Get Bills
router.get("/", async (req, res) =>{
  try {
    const bills = await Bill.find({ email: req.query.email });
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).send({message: "Internal Server Error"})
  }
})

//Edit Bill Details
router.put("/", async (req, res) => {
  try {
    const updatedBill = await Bill.findByIdAndUpdate(
      {_id:req.query.id},
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedBill);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Bills
router.delete("/", async (req, res)=>{
 
  try {
    const bill = await Bill.findByIdAndDelete({_id:req.query.id});
    res.status(200).send({message: "deleted"});
  } catch (err) {
    res.status(500).json(err);
  }
}
)

module.exports = router;