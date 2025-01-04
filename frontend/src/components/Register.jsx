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
      await axios.post(
        "https://simple-calendar.onrender.com/api/auth/register",
        {
          name,
          email,
          password,
        }
      );
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
        Sign up for a new account
      </Typography>

      {error && <div className="message error-message">{error}</div>}
      {success && <div className="message success-message">{success}</div>}

      <form onSubmit={handleRegister}>
        <TextField
          label="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
          variant="outlined"
          className="custom-input"
          sx={{ mb: 2 }}
        />

        <TextField
          label="Email Address"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          margin="normal"
          variant="outlined"
          className="custom-input"
          sx={{ mb: 2 }}
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
          variant="outlined"
          className="custom-input"
          sx={{ mb: 3 }}
        />

        <Button className="custom-button" type="submit" fullWidth>
          Create Account
        </Button>
      </form>
    </Paper>
  );
};

export default Register;
