import { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { api } from "./api";
const NoteForm = ({
  addNote,
}: {
  addNote: (_: { content: string }) => void;
}) => {
  const [formData, setFormData] = useState({
    content: "",
  });

  const handleSaveNote = async () => {
    const newNote = await api.post("/notes", formData);
    const created = Array.isArray(newNote.data) ? newNote.data[0] : newNote.data;
    addNote(created);
    setFormData({
      content: "",
    });
  };
  return (
    <Box
      sx={{
        border: "1px solid black",
        padding: 2,
        marginTop: 2,
        gap: 2,
      }}
    >
      <h2>Create New Note</h2>
      <TextField
        variant="outlined"
        type="text"
        value={formData.content}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, content: e.target.value }))
        }
      />
      <Button onClick={handleSaveNote}>Save Note</Button>
    </Box>
  );
};

export default NoteForm;
