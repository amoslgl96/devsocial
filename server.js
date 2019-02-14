
const express = require("express");
const mongoose = require("mongoose");

const app = express();

// retrieve routes objects
const posts = require("./routes/api/posts");
const profiles = require("./routes/api/profile");
const users = require("./routes/api/users");

//retrieve db object
const db = require("./config/keys").mongoURI;

app.get("/", (req,res) => res.send("hello"));

//set up route listeners
app.use("/api/posts", posts);
app.use("/api/profile", profiles);
app.use("/api/users", users);


const port = process.env.PORT || 5000;


mongoose
.connect(db,{useNewUrlParser: true}).
then(()=>console.log("Mongoose success")).catch(err => console.log(err));


//The server.listen() method creates a listener on the specified port or path.
app.listen(port, () => console.log(`Server running on port ${port} baby`));


