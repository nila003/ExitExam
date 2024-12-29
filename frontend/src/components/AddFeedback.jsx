import React, { useState } from "react";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";

const AddFeedback = () => {
  const [courseName, setCourseName] = useState("");
  const [courseDuration, setCourseDuration] = useState("");
  const [rating, setRating] = useState("");
  const [comments, setComments] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/feedback", {
        courseName,
        courseDuration,
        rating,
        comments,
      });
      setCourseName("");
      setCourseDuration("");
      setRating("");
      setComments("");
      alert("Feedback added successfully!");
    } catch (error) {
      console.error("Error adding feedback", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Course Name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Course Duration"
          value={courseDuration}
          onChange={(e) => setCourseDuration(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Rating"
          type="number"
          inputProps={{ min: 1, max: 5 }}
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          label="Comments"
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          margin="normal"
          multiline
          rows={4}
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default AddFeedback;
