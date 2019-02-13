
const express = require("express");
const mongoose = require("mongoose");


const app = express();

app.get("/", (req,res) => res.send("hello"));


const port = process.env.PORT || 5000;

const db = require("./config/keys").mongoURI;

mongoose
.connect(db,{useNewUrlParser: true}).
then(()=>console.log("Mongoose success")).catch(err => console.log(err));


//The server.listen() method creates a listener on the specified port or path.
app.listen(port, () => console.log(`Server running on port ${port} baby`));


