const router = require("express").Router();
const Expense = require("../models/expense");

router.get("/", async (req, res) =>{
  try {
    
    const year = req.query.year;
    const email = req.query.email;
    
    const yearlyExpenses = await Expense.find({
        "date": {
            '$gte': new Date(`${year}-01-01`),
            '$lte': new Date(`${year}-12-31`)
        },
        "email": email
    });
    
    res.status(200).json(yearlyExpenses);
  } catch (error) {
    console.log(error)
    res.status(500).send({message: "Internal Server Error"});
  }
})

module.exports = router;