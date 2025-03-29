import { useState, useEffect } from "react";
import { Typography, Container, Box, Grid, Backdrop, CircularProgress } from "@mui/material";

import { ACTIONS } from "../contexts/WorkoutContext";
import useWorkoutContext from "../hooks/useWorkoutContext";
import useAuthContext from "../hooks/useAuthContext";

import Navbar from "../components/Navbar";
import WorkoutCard from "../components/WorkoutCard";
import ModalAdd from "../components/ModalAdd";
import ModalEdit from "../components/ModalEdit";
import ModalDelete from "../components/ModalDelete";

const Home = () => {
  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  const { workoutList, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchWorkoutList = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_API_BASE_URL + "/api/workout",
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        const json = await response.json();

        dispatch({ type: ACTIONS.SET_WORKOUT_LIST, payload: json.workoutList });
      } catch (error) {
        console.log(error);
      } finally {
        setShowLoader(false);
      }
    };

    if (user) {
      fetchWorkoutList();
    }
  }, [dispatch, user]);

  const modifyWorkout = (key, value) => {
    dispatch({ type: ACTIONS.MODIFY_WORKOUT, payload: { key, value } });
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };

  const ModalAddProps = {
    openAddModal,
    setOpenAddModal,
    modifyWorkout,
    modalStyle,
  };
  const ModalEditProps = {
    openEditModal,
    setOpenEditModal,
    modifyWorkout,
    modalStyle,
  };
  const ModalDeleteProps = { 
    openDeleteModal, 
    setOpenDeleteModal, 
    modalStyle 
  };

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Navbar */}
      <Navbar setOpenAddModal={setOpenAddModal} />

      {/* Workout Cards */}
      <Container sx={{ flex: 1, py: 4 }}>
        <Grid container spacing={2} direction="column">
          {workoutList &&
            workoutList.map((workout) => (
              <WorkoutCard
                key={workout._id}
                workout={workout}
                setOpenEditModal={setOpenEditModal}
                setOpenDeleteModal={setOpenDeleteModal}
              />
            ))}
        </Grid>
      </Container>

      {/* Add Modal */}
      <ModalAdd {...ModalAddProps} />

      {/* Edit Modal */}
      <ModalEdit {...ModalEditProps} />

      {/* Delete Modal */}
      <ModalDelete {...ModalDeleteProps} />

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: 2,
          textAlign: "center",
          bgcolor: "background.paper",
          mt: "auto",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Workout Tracker © {new Date().getFullYear()} Glenville Maturan
        </Typography>
      </Box>

      {/* Loader */}
      <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open={showLoader}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
};

export default Home;
