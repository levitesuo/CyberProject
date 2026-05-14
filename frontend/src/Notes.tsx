import Box from "@mui/material/Box";
const Notes = ({ notes }: { notes: { content: string }[] }) => {
  console.log("Notes component received notes:", notes);
  return (
    <Box
      sx={{
        border: "1px solid black",
        padding: 2,
        marginTop: 2,
        gap: 2,
      }}
    >
      <h2>Your notes</h2>
      {notes?.length > 0 ? (
        notes.map((note, index) => <p key={index}>{note.content}</p>)
      ) : (
        <p>No notes available.</p>
      )}
    </Box>
  );
};

export default Notes;
