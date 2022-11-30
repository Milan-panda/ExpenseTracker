const router = require("express").Router();
const Expense = require("../models/expense");

//Add Expense
router.post("/", async (req, res) => {
  const newExpense = new Expense(req.body);
  try {
    const addedExpense = await newExpense.save();
    res.status(200).json(addedExpense);
  } catch (error) {
    res.status(500).send({ message: error });
  }
});

//Get Expenses
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find({ email: req.query.email });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//Edit Expense Details
router.put("/", async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      {_id: req.query.id},
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Expense
router.delete("/", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete({ _id: req.query.id });
    console.log(expense);
    res.status(200).send({ message: "deleted" });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/", async (req, res)=>{
 
  try {
    const expense = await Expense.findByIdAndDelete({_id:req.query.id});
    console.log(expense);
    res.status(200).send({message: "deleted"});
  } catch (err) {
    res.status(500).json(err);
  }
}
)

module.exports = router;