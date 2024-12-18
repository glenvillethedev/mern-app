import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import middleware from "./middlewares/middleware.js";
import workoutRoutes from "./routes/workoutRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(middleware.logger);

app.use("/api/workout", workoutRoutes);
app.use("/api/user", userRoutes);

app.use(middleware.invalidUrl);
app.use(middleware.errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.clear();
      console.log(`\nDB Connection Successful...`);
      console.log(
        `Server Running at PORT:${process.env.PORT}...`
      );
    });
  })
  .catch((error) => {
    console.clear();
    console.log("\nDB Connection Failed...");
    console.log(error);
  });
