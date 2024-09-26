const express = require("express");
require("dotenv").config();
const userRoute = require("./router/user");
const blogRoute = require("./router/blog");
const connectDB = require("./config/db")
const app = express();

const Port = process.env.PORT || 5000;
//Middleware
app.use(express.json());

connectDB();

//Routes
app.use("/api/v1", userRoute);
app.use("/api/v1", blogRoute);

app.use("*", (req, res) => {
  res.status(404).json({
    status: false,
    message: "Route are not found"
  })
})

app.listen(Port, () => {
  console.log(`server is listen ${Port}`);
})