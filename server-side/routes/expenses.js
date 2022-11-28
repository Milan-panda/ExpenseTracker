const router = require("express").Router();
const Expense = require("../models/expense");

router.post("/", async (req, res) => {
  const newExpense = new Expense(req.body);
  try {
    const addedExpense = await newExpense.save();
    res.status(200).json(addedExpense);
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/", async (req, res) =>{
  try {
    const expenses = await Expense.find({ email: req.query.email });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).send({message: "Internal Server Error"})
  }
})

module.exports = router;