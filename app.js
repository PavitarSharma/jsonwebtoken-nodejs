const express = require("express");
const morgan = require("morgan");
const createError = require("http-errors");
const bodyParser = require("body-parser");
require("dotenv").config();
require("./helpers/mongo.connection")
const authRoutes = require("./routes/auth.routes")

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.get("/", async (req, res) => {
  res.send("Hello from express");
});

app.use("/auth", authRoutes)

app.use(async (req, res, next) => {
//   const error = new Error("Not found");
//   error.status = 404;
//   next(error);
    next(createError.NotFound())
});

app.use(async (err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(PORT, console.log(`Server listening on port ${PORT}...`));
