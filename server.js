const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const passport = require("passport");

// retrieve routes objects
const posts = require("./routes/api/posts");
const profiles = require("./routes/api/profile");
const users = require("./routes/api/users");

const app = express();

// Body parser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

app.use(bodyParser.json());

//retrieve db object
const db = require("./config/keys").mongoURI;

app.get("/", (req, res) => res.send("hello"));

//set up route listeners
app.use("/api/posts", posts);
app.use("/api/profile", profiles);
app.use("/api/users", users);

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Mongoose success"))
  .catch(err => console.log(err));

//passport middleware
app.use(passport.initialize());

//passport config
require("./config/passport")(passport);

const port = process.env.PORT || 5000;

//The server.listen() method creates a listener on the specified port or path.
app.listen(port, () => console.log(`Server running on port ${port} baby`));
