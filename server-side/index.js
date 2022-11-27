require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db")
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
  

//database connection
connection();

//middlewares
app.use(express.json());
app.use(cors());

//routes
app.use("/users", userRoutes)
app.use("/auth", authRoutes)

const port = process.env.PORT || 8080;
app.listen(port, ()=> console.log(`Listening on port ${port}`))
