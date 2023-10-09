const express = require("express");
const { PORT } = require("./config");
const apolloniaRoutes = require("./routes/index,js");
const connectDB = require("./config/db");

const app = express();

const port = PORT;

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/v1/apollonia", apolloniaRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Apollonia Dental Practice Employee Management System!");
});

connectDB().then(() => {
  app.listen(port, '0.0.0.0', () => {
    console.log("Server connected on PORT:", port);
  });
});
