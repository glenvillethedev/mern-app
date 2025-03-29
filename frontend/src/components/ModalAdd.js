import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  Modal,
  TextField,
  Alert,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

import useWorkoutContext from "../hooks/useWorkoutContext";
import useAuthContext from "../hooks/useAuthContext";
import { ACTIONS } from "../contexts/WorkoutContext";

const ModalAdd = ({
  openAddModal,
  setOpenAddModal,
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
    setOpenAddModal(false);
    dispatch({ type: ACTIONS.CLEAR_WORKOUT });
  };

  const handleAdd = async () => {
    setError("");
    setIsLoading(true);

    if (!user) {
      setError("Please login to add a new workout.");
      return;
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + "/api/workout",
        {
          method: "POST",
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
        dispatch({ type: ACTIONS.ADD_WORKOUT, payload: json });
      }
    } catch (error) {
      console.log(error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <Modal
      open={openAddModal}
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
        <Typography variant="h6">Add Workout</Typography>
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
          value={workoutData.title}
          onChange={(e) => modifyWorkout("title", e.target.value)}
          error={emptyFields.includes("title")}
          disabled={isLoading}
        />
        <TextField
          label="Number of Reps"
          type="number"
          fullWidth
          margin="normal"
          value={workoutData.reps}
          onChange={(e) => modifyWorkout("reps", e.target.value)}
          error={emptyFields.includes("reps")}
          disabled={isLoading}
        />
        <TextField
          label="Load (kg)"
          type="number"
          fullWidth
          margin="normal"
          value={workoutData.load}
          onChange={(e) => modifyWorkout("load", e.target.value)}
          error={emptyFields.includes("load")}
          disabled={isLoading}
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={handleAdd} loading={isLoading} loadingPosition="start" startIcon={<AddIcon />}>
          {isLoading ? "Submitting" : "Add"}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalAdd;
