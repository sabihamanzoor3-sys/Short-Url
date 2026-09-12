require("dotenv").config();
const express = require("express");
const path = require("path");
const { connectToMongoDB } = require("./connect");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");
const { restricToLoggedinUserOnly, checkAuth } = require("./middlewares/auth");

const app = express();
const PORT = process.env.PORT || 8001;

connectToMongoDB(process.env.MONGO_URL)
.then(() => console.log("mongodb connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());

app.use("/url",restricToLoggedinUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

module.exports = app;

