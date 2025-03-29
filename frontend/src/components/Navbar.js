import React, { useState } from 'react';
import {
  AppBar, Container, Toolbar, Typography, Button, Box, IconButton, Drawer, List, ListItem, ListItemText, Divider, useMediaQuery, useTheme
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LogoutIcon from '@mui/icons-material/Logout';

import useLogout from "../hooks/useLogoutHook";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = ({ setOpenAddModal }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [openDrawer, setOpenDrawer] = useState(false);

  const { logout } = useLogout();
  const { user } = useAuthContext();
  
  const toggleDrawer = (open) => () => {
    setOpenDrawer(open);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            {/* App Name */}
            <Typography variant={isSmallScreen ? "h5" : "h4"} sx={{ flexGrow: 1 }}>
              Workout Tracker
            </Typography>

            {/* Responsive Menu */}
            {isSmallScreen ? (
              <>
                <IconButton edge="end" color="inherit" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={openDrawer}
                  onClose={toggleDrawer(false)}
                >
                  <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
                    <List>
                      <ListItem>
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          {user.email}
                        </Typography>
                      </ListItem>
                      <Divider />
                      <ListItem onClick={() => setOpenAddModal(true)}>
                        <FitnessCenterIcon sx={{ mr: 1 }} />
                        <ListItemText primary="Add Workout" />
                      </ListItem>
                      <Divider />
                      <ListItem onClick={handleLogout}>
                        <LogoutIcon sx={{ mr: 1 }} />
                        <ListItemText primary="Logout" />
                      </ListItem>
                    </List>
                  </Box>
                </Drawer>
              </>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography>{user.email}</Typography>
                <Button
                  color="inherit"
                  onClick={() => setOpenAddModal(true)}
                  variant="outlined"
                  startIcon={<FitnessCenterIcon />}
                >
                  Add Workout
                </Button>
                <Button
                  color="inherit"
                  variant="outlined"
                  onClick={handleLogout}
                  startIcon={<LogoutIcon />}
                >
                  Logout
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
