require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const expenseRoute = require("./routes/expenses");
const monthlyDataRoutes = require("./routes/monthlyData")
const yearlyDataRoutes = require("./routes/yearlyData")
const billRoute = require("./routes/bills");  

//database connection
connection();

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
//middlewares
app.use(express.json());
app.use(cors(corsOptions));

//routes
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/expense", expenseRoute);
app.use("/monthlyData", monthlyDataRoutes)
app.use("/yearlyData", yearlyDataRoutes)

app.use("/bill", billRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}`));
