import { Box } from "@mui/material";
import NewUserForm from "./NewUserForm";
import LoginForm from "./LoginForm";
import { useEffect, useState } from "react";
import Notes from "./Notes";
import NoteForm from "./NoteForm";
import { api } from "./api";
const App = () => {
  const [user, setUser] = useState<string | null>(null);
  const [notes, setNotes] = useState<{ content: string }[]>([]);
  useEffect(() => {
    if (!user) return;
    const fetchNotes = async () => {
      const notesData = await api.get("/notes").then((res) => res.data);
      setNotes(notesData);
    };
    fetchNotes();
  }, [user]);
  const addNote = (note: { content: string }) => {
    setNotes((prev) => [...prev, note]);
  };
  return (
    <>
      <Box
        sx={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h1>CyberProject</h1>
        {user && <h3>Welcome, {user}!</h3>}
      </Box>
      <Box sx={{ flexDirection: "row", display: "flex", gap: 2 }}>
        <NewUserForm />
        <LoginForm setUser={setUser} />
      </Box>
      {user && <Notes notes={notes} />}
      {user && <NoteForm addNote={addNote} />}
    </>
  );
};
export default App;
