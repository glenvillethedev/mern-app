import express from "express";
import middleware from "../middlewares/middleware.js"
import {
  getWorkoutList,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from "../controllers/workoutController.js"

const workoutRoutes = express.Router();

workoutRoutes.use(middleware.authenticator);

workoutRoutes.get("/", getWorkoutList);

workoutRoutes.get("/:id", getWorkout);

workoutRoutes.post("/", createWorkout);

workoutRoutes.patch("/:id", updateWorkout);

workoutRoutes.delete("/:id", deleteWorkout);

export default workoutRoutes;