import { useState } from "react";
import axios from "axios";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { UserPlus } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      setSuccess("Registration successful! Please login.");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Paper className="form-container" elevation={0}>
      <div className="form-title">
        <UserPlus size={22} />
        Create Account
      </div>
      <Typography className="form-subtitle">
        Sign up to get started with your calendar
      </Typography>

      {error && <div className="message error-message">{error}</div>}

      {success && <div className="message success-message">{success}</div>}

      <form onSubmit={handleRegister}>
        <TextField
          label="Full Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          variant="outlined"
          className="custom-input"
          sx={{ mb: 2 }}
        />

        <TextField
          label="Email Address"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
          className="custom-input"
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
          className="custom-input"
          sx={{ mb: 3 }}
        />

        <Button className="custom-button" type="submit" fullWidth>
          Sign Up
        </Button>
      </form>
    </Paper>
  );
};

export default Register;
