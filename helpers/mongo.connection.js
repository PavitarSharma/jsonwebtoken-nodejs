const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: process.env.DATABASE_NAME,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("mongodb connected...");
  })
  .catch((error) => console.log(error.message));

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (error) => {
  console.log(error.message);
});

mongoose.connection.on("diconnected", () => {
  console.log("Mongoose connection is diconnected");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
