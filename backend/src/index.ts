import express from "express";
import cors from "cors";
import "./models/index.js";
import { authRouter } from "./routes/auth.js";
import { notesRouter } from "./routes/notes.js";

const app = express();
app.use(cors({ origin: process.env["FRONTEND_URL"] ?? "http://localhost:5173" }));
app.use(express.json());

const PORT = process.env["PORT"] ?? 3001;

app.use("/auth", authRouter);
app.use("/notes", notesRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
