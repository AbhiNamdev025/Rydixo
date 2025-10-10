const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const port = process.env.PORT;
const mongourl = process.env.MongoURL;

//User
const getUserData = require("./backend/router/userroute/post/postRoute");
const postUserData = require("./backend/router/userroute/get/getRoute");
const putUserData = require("./backend/router/userroute/put/putRoute");
const deleteUserData = require("./backend/router/userroute/delete/delRoute");

const loginUser = require("./backend/router/loginroute/loginRoute");

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(mongourl)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection failed:", err));

//For User
app.use("/user", getUserData);
app.use("/user", postUserData);
app.use("/user", putUserData);
app.use("/user", deleteUserData);
app.use("/user", loginUser);

app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});
app.listen(port, () => {
  console.log(`Running at port ${port}`);
});
