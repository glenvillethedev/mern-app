import React from "react";
import {
  IconButton,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { formatDistanceToNow } from "date-fns";

import useWorkoutContext from "../hooks/useWorkoutContext";
import { ACTIONS } from "../contexts/WorkoutContext";

const WorkoutCard = ({ workout, setOpenEditModal, setOpenDeleteModal }) => {
  const { dispatch } = useWorkoutContext();

  return (
    <Grid key={workout.id}>
      <Card sx={{ width: "100%", position: "relative" }}>
        <CardActions sx={{ position: "absolute", top: 0, right: 0 }}>
          <IconButton
            onClick={() => {
              dispatch({
                type: ACTIONS.SET_WORKOUT,
                payload: workout,
              });
              setOpenEditModal(true);
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={() => {
              dispatch({
                type: ACTIONS.SET_WORKOUT,
                payload: workout,
              });
              setOpenDeleteModal(true);
            }}
          >
            <Delete />
          </IconButton>
        </CardActions>
        <CardContent>
          <Typography variant="h6" sx={{color: "#1976d2", mb: '10px'}}><strong>{workout.title}</strong></Typography>
          <Typography variant="subtitle1"><strong>Reps:</strong> {workout.reps}</Typography>
          <Typography variant="subtitle1" sx={{ mb: '10px' }}><strong>Load:</strong> {workout.load} kg</Typography>
          <Typography variant="caption">
            Updated{" "}
            {formatDistanceToNow(new Date(workout.createdAt), {
              addSuffix: true,
            })}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default WorkoutCard;