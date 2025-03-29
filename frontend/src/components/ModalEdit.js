import React from "react";
import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Modal,
  TextField,
  Alert,
} from "@mui/material";
import Edit from '@mui/icons-material/Edit';

import useWorkoutContext from "../hooks/useWorkoutContext";
import useAuthContext from "../hooks/useAuthContext";
import { ACTIONS } from "../contexts/WorkoutContext";

const ModalEdit = ({
  openEditModal,
  setOpenEditModal,
  modifyWorkout,
  modalStyle,
}) => {
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { workoutData, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const resetModal = () => {
    setError("");
    setEmptyFields([]);
    setOpenEditModal(false);
    dispatch({ type: ACTIONS.CLEAR_WORKOUT });
  };

  const handleEdit = async () => {
    setError("");
    setIsLoading(true);

    if (!user) {
      setError("Please login to add update an existing workout.");
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + `/api/workout/${workoutData._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({
            title: workoutData.title,
            load: workoutData.load,
            reps: workoutData.reps,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const json = await response.json();

      if (!response.ok) {
        setError(json.errMsg);
        setEmptyFields(json.emptyFields);
      } else {
        resetModal();
        dispatch({ type: ACTIONS.UPDATE_WORKOUT, payload: json });
      }
    } catch (error) {
      console.log(error);
    }finally {
        setIsLoading(false);
    }
  };
  return (
    <Modal
      open={openEditModal}
      onClose={() => {
        resetModal();
      }}
    >
      <Box
        sx={{
          ...modalStyle,
          width: "90%",
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">Update Workout</Typography>
        {error && (
          <Alert
            severity="error"
            sx={{ mt: 1 }}
            onClose={() => {
              setError("");
            }}
          >
            {error}
          </Alert>
        )}
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={workoutData?.title || ""}
          onChange={(e) => modifyWorkout("title", e.target.value)}
          error={emptyFields.includes("title")}
          disabled={isLoading}
        />
        <TextField
          label="Number of Reps"
          type="number"
          fullWidth
          margin="normal"
          value={workoutData?.reps || ""}
          onChange={(e) => modifyWorkout("reps", e.target.value)}
          error={emptyFields.includes("reps")}
          disabled={isLoading}
        />
        <TextField
          label="Load (kg)"
          type="number"
          fullWidth
          margin="normal"
          value={workoutData?.load || ""}
          onChange={(e) => modifyWorkout("load", e.target.value)}
          error={emptyFields.includes("load")}
          disabled={isLoading}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleEdit} startIcon={<Edit />} loading={isLoading} loadingPosition="start">
          {isLoading ? "Updating" : "Update"}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalEdit;
