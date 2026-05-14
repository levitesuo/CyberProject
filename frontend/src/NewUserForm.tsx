import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { api } from "./api";

const NewUserForm = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleNewUser = async () => {
    try {
      await api.post("/auth/register", formData);
    } catch (error) {
      console.error("New user failed:", error);
    }
    setFormData({ username: "", password: "" });
  };

  return (
    <Box sx={{ border: "1px solid black", padding: 2, marginTop: 2, gap: 2 }}>
      <h2>Create new user</h2>
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
      <Button variant="contained" onClick={handleNewUser}>
        Create
      </Button>
    </Box>
  );
};

export default NewUserForm;
