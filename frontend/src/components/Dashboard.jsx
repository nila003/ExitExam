import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";

const Dashboard = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [editFeedback, setEditFeedback] = useState(null); // Selected feedback to edit
  const [open, setOpen] = useState(false); // Modal state

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Fetch all feedbacks
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get("http://localhost:3000/feedback");
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedbacks", error);
    }
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/feedback/${id}`);
      fetchFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback", error);
    }
  };

  // Open the modal and set the selected feedback for editing
  const handleEditClick = (feedback) => {
    setEditFeedback(feedback);
    setOpen(true);
  };

  // Close the modal
  const handleClose = () => {
    setOpen(false);
    setEditFeedback(null);
  };

  // Handle the form submission to update feedback
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/feedback/${editFeedback._id}`, editFeedback);
      fetchFeedbacks();
      handleClose();
    } catch (error) {
      console.error("Error updating feedback", error);
    }
  };

  // Handle input change for feedback form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditFeedback({ ...editFeedback, [name]: value });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Course Name</TableCell>
              <TableCell>Course Duration</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {feedbacks.map((feedback) => (
              <TableRow key={feedback._id}>
                <TableCell>{feedback.courseName}</TableCell>
                <TableCell>{feedback.courseDuration}</TableCell>
                <TableCell>{feedback.rating}</TableCell>
                <TableCell>{feedback.comments}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => handleEditClick(feedback)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => deleteFeedback(feedback._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal for Editing Feedback */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Feedback</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Course Name"
            name="courseName"
            value={editFeedback?.courseName || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Course Duration"
            name="courseDuration"
            value={editFeedback?.courseDuration || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Rating"
            name="rating"
            type="number"
            inputProps={{ min: 1, max: 5 }}
            value={editFeedback?.rating || ""}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Comments"
            name="comments"
            value={editFeedback?.comments || ""}
            onChange={handleChange}
            multiline
            rows={3}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Dashboard;
