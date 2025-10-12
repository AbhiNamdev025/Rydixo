require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const port = process.env.PORT;
const mongourl = process.env.MongoURL;

//google and fb auth
const passport = require("./backend/controller/auth/googleAuth");
const authRoutes = require("./backend/router/auth/googleRoute");
//User
const getUserData = require("./backend/router/userroute/post/postRoute");
const postUserData = require("./backend/router/userroute/get/getRoute");
const putUserData = require("./backend/router/userroute/put/putRoute");
const deleteUserData = require("./backend/router/userroute/delete/delRoute");
//login
const loginUser = require("./backend/router/loginroute/loginRoute");

//contact form
const contactRoute = require("./backend/router/contact/mailRoute");

//passwordReset

const passwordRoute = require("./backend/router/auth/passwordRoute");
const app = express();

app.use(express.json());
app.use(cors());

//mongoose

mongoose
  .connect(mongourl)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("DB connection failed:", err));

//Auth
app.use(
  session({
    secret: process.env.SESSION_SECRET || "your-secret-key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

//For User
app.use("/user", getUserData);
app.use("/user", postUserData);
app.use("/user", putUserData);
app.use("/user", deleteUserData);
app.use("/user", loginUser);

// Use auth routes
app.use("/auth", authRoutes);

//contact
app.use("/api", contactRoute);

//pass reset
app.use("/auth/password", passwordRoute);

//test
app.get("/", (req, res) => {
  res.json({ message: "Server is running!" });
});

//port
app.listen(port, () => {
  console.log(`Running at port ${port}`);
});
