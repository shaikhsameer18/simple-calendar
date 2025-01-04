import { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Paper, Typography, TextField, Button } from "@mui/material";
import { LogIn } from "lucide-react";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email,
          password,
        }
      );
      setToken(response.data.token);
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Paper className="form-container" elevation={0}>
      <div className="form-title">
        <LogIn size={22} />
        Welcome Back
      </div>
      <Typography className="form-subtitle">
        Please sign in to your account
      </Typography>

      {error && <div className="message error-message">{error}</div>}

      <form onSubmit={handleLogin}>
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
          Sign In
        </Button>
      </form>
    </Paper>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
