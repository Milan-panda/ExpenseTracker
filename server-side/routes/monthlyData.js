const router = require("express").Router();
const Expense = require("../models/expense");

router.get("/", async (req, res) =>{
  try {
    // const expenses = await Expense.find({ email: req.query.email });
    const month = req.query.month;
    const email = req.query.email;
    const year = new Date().getFullYear();
    const monthlyExpenses = await Expense.find({
        "date": {
            '$gte': new Date(`${year}-${month}-01`),
            '$lte': new Date(`${year}-${month}-31`)
        },
        "email": email
    });
    
    res.status(200).json(monthlyExpenses);
  } catch (error) {
    console.log(error)
    res.status(500).send({message: "Internal Server Error"});
  }
})

module.exports = router;