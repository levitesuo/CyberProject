import { Box, Button, TextField } from "@mui/material";
import { api, setAuthToken } from "./api";
import { useState } from "react";

const LoginForm = ({ setUser }: { setUser: (username: string) => void }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", formData);
      setAuthToken(response.data.token);
      setUser(formData.username);
    } catch (error) {
      console.error("Login failed:", error);
    }
    setFormData({
      username: "",
      password: "",
    });
  };
  return (
    <>
      <Box
        sx={{
          border: "1px solid black",
          padding: 2,
          marginTop: 2,
          gap: 2,
        }}
      >
        <h2>Login</h2>
        <Box sx={{ flexDirection: "row", display: "flex" }}>
          <Box>
            <h3>Username</h3>
            <TextField
              variant="outlined"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, username: e.target.value }))
              }
            />
          </Box>
          <Box>
            <h3>Password</h3>
            <TextField
              variant="outlined"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, password: e.target.value }))
              }
            />
          </Box>
        </Box>
        <Button onClick={handleLogin}>Login</Button>
      </Box>
    </>
  );
};

export default LoginForm;
