import { useState } from "react";
import { Typography, Button, Box, Modal, Alert } from "@mui/material";
import Delete from '@mui/icons-material/Delete';


import useWorkoutContext from "../hooks/useWorkoutContext";
import useAuthContext from "../hooks/useAuthContext";
import { ACTIONS } from "../contexts/WorkoutContext";

const ModalDelete = ({ openDeleteModal, setOpenDeleteModal, modalStyle }) => {
  const [error, setError] = useState(null);

  const { workoutData, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(false);

  const resetModal = () => {
    setOpenDeleteModal(false);
    dispatch({ type: ACTIONS.CLEAR_WORKOUT });
  };

  const handleDelete = async () => {
    setError("");
    setIsLoading(true);

    if (!user) {
      setError("Please login to add update an existing workout.");
    }

    try {
      const response = await fetch(
        process.env.REACT_APP_API_BASE_URL + `/api/workout/${workoutData._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      if (response.ok) {
        const json = await response.json();
        resetModal();
        dispatch({ type: ACTIONS.DELETE_WORKOUT, payload: json });
      }
    } catch (error) {
      console.log(error);
    }finally{
        setIsLoading(false);
    }
  };

  return (
    <Modal
      open={openDeleteModal}
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
        <Typography variant="h6">Confirm Delete</Typography>
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
        <Typography sx={{ mt: 2, mb: 2 }}>
          Are you sure you want to delete this workout? <br />
          <br />'{workoutData.title}'
        </Typography>
        <Button
          variant="contained"
          color="error"
          sx={{ mt: 2 }}
          onClick={handleDelete}
          startIcon={<Delete />}
          loading={isLoading}
          loadingPosition="start"
        >
          {isLoading ? "Deleting" : "Delete"}
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalDelete;
