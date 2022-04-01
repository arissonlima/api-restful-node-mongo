const express = require("express");
const mongoose = require("mongoose");
const personRoutes = require("./routes/personRoutes");

const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/person", personRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

mongoose
  .connect(
    "mongodb+srv://aryssonweb:050488@cluster0.3amvd.mongodb.net/api_nodejs_mongodb?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Conectado ao banco!");
    app.listen(3000);
  })
  .catch((err) => console.log(err));
