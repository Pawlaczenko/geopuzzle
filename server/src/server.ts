import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js"
process.on("uncaughtException", (err) => {
  console.log(err, "\n");
  console.log(err.name, err.message);
  console.log("Shutting down");

  process.exit(1);
});



dotenv.config({
  path: "./config.env",
});

const PORT = process.env.PORT;
const DBConnectionStr = process.env.DB_URL!.replace(
  '<password>',
  process.env.DB_PASS!
);
mongoose
  .connect(DBConnectionStr)
  .then(() => {
    console.log('GeoPuzzle Database connected');
  })
  .catch((error) => {
    console.log('Geopuzzle app cannot connect database');
    console.error(error)
  });

const server = app.listen(PORT, () => {
  console.log(`Server GeoPuzzle is running on ${PORT}port in ${process.env.NODE_ENV} mode`);
});
