import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" style={{ marginBottom: "20px" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Feedback Admin Panel
        </Typography>
        <Button color="inherit" component={NavLink} to="/" exact>
          Dashboard
        </Button>
        <Button color="inherit" component={NavLink} to="/add-feedback">
          Add Feedback
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
