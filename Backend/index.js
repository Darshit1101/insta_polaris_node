const express = require("express");
const cors = require("cors");
const app = express();

//importing routes
const user_Routes = require("./api/user/route");
const create_Routes = require("./api/post/route");
const comment_Routes = require("./api/comment/route");

//mongo connection
const { mongoUrl } = require("./keys");
const mongoose = require("mongoose");
mongoose.connect(mongoUrl);

app.use(express.json()); //control kare postman no data json ma aave
app.use(cors());

// Mounting user routes
app.use("", user_Routes);

// Mounting createPost routes
app.use("", create_Routes);

// Mounting comment routes
app.use("", comment_Routes);

app.listen(5000);
