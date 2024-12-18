import Workout from "../models/workoutModel.js";
import mongoose from "mongoose";

// get
const getWorkoutList = async (req, res, next) => {
  try {
    const workoutList = await Workout.find({user_id: req.user._id}).sort({ createdAt : -1 });
    res.status(200).json({ workoutList });
  } catch (err) {
    next(err);
  }
};

// get:id
const getWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      const err = new Error("Workout ID is invalid.");
      err.status = 400;
      throw err;
    }

    const workout = await Workout.findOne({ _id : id, user_id : req.user._id });

    if (!workout) {
      const err = new Error("Workout does not exist.");
      err.status = 404;
      throw err;
    }

    res.status(200).json(workout);
  } catch (err) {
    next(err);
  }
};

// post/create
const createWorkout = async (req, res, next) => {
  try {
    const { title, reps, load } = req.body;
    const emptyFields = [];

    if(!title){
      emptyFields.push('title');
    }
    if(!reps){
      emptyFields.push('reps');
    }
    if(!load){
      emptyFields.push('load');
    }
    if(emptyFields.length != 0){
      const err = new Error("Please fill in the missing fields.");
      err.status = 404;
      err.emptyFields = emptyFields;
      err.isValidation = true;
      throw err;
    }

    const newWorkout = await Workout.create({ title, reps, load, user_id : req.user._id });
    res.status(200).json(newWorkout);
  } catch (err) {
    next(err);
  }
};

// update:id
const updateWorkout = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, reps, load } = req.body;
    const emptyFields = [];

    if (!mongoose.isValidObjectId(id)) {
      const err = new Error("Workout ID is invalid.");
      err.status = 400;
      throw err;
    } 

    if(!title){
      emptyFields.push('title');
    }
    if(!reps){
      emptyFields.push('reps');
    }
    if(!load){
      emptyFields.push('load');
    }
    if(emptyFields.length != 0){
      const err = new Error("Please fill in the missing fields.");
      err.status = 404;
      err.emptyFields = emptyFields;
      err.isValidation = true;
      throw err;
    }

    await Workout.findOneAndUpdate({_id : id, user_id: req.user._id}, { title, reps, load });
    const updatedWorkout = await Workout.findById(id);
    if (!updatedWorkout) {
      const err = new Error("Workout does not exist.");
      err.status = 404;
      throw err;
    }
    res.status(200).json(updatedWorkout);
  } catch (err) {
    next(err);
  }
};

// delete:id
const deleteWorkout = async (req, res, next) => {
    try {
      const { id } = req.params;
  
      if (!mongoose.isValidObjectId(id)) {
        const err = new Error("Workout ID is invalid.");
        err.status = 400;
        throw err;
      } 
  
      const deletedWorkout = await Workout.findOneAndDelete({_id : id, user_id : req.user._id});
      if (!deletedWorkout) {
        const err = new Error("Workout does not exist.");
        err.status = 404;
        throw err;
      }
      res.status(200).json(deletedWorkout);      
    } catch (err) {
      next(err);
    }
  };

export {
  getWorkoutList,
  getWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
};
