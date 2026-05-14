import { Router, type Response } from "express";
import requireAuth, { type AuthRequest } from "../middleware/authMiddleware.js";
import { Note } from "../models/index.js";
import { sequelize } from "../db.js";
export const notesRouter = Router();

notesRouter.get("/", requireAuth, async (req: AuthRequest, res: Response) => {
  const notes = await Note.findAll({ where: { user_id: req.user?.userId } });
  res.json(notes);
});

notesRouter.post("/", requireAuth, async (req: AuthRequest, res: Response) => {
  const { content } = req.body;

  if (!content) {
    res.status(400).json({ error: "Content is required" });
    return;
  }

  try {
    // VULNERABILITY 2: Open to sql injection
    // LINK: https://owasp.org/Top10/2021/A03_2021-Injection/
    // FIX:
    /*
    const note = await Note.create({
      user_id: req.user?.userId,
      content,
    });
    */
    const query = `INSERT INTO notes (user_id, content) VALUES (${req.user?.userId}, '${content}') RETURNING *`;

    const [note] = await sequelize.query(query, {
      type: sequelize.QueryTypes.INSERT,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: "Database error", details: error });
  }
});

notesRouter.get(
  "/:id",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    // VULNERABILITY 1: No chekck if the note belongs to the user
    // LINK: https://owasp.org/Top10/2021/A01_2021-Broken_Access_Control/
    // FIX:
    /*
    const note = await Note.findOne({
      where: { id: Number(req.params.id), user_id: req.user?.userId },
    });
    */

    const note = await Note.findOne({
      where: { id: Number(req.params.id) },
    });
    if (!note) {
      res.status(404).json({ error: "Note not found" });
      return;
    }
    res.json(note);
  },
);

const placeholder_costly_ai_call = async (prompt: string): Promise<string> => {
  // This ai call is very costly
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`AI response to: ${prompt}`);
    }, 5000);
  });
};

// VULNERABILITY 5: No rate limiting on costly endpoint
// LINK: https://owasp.org/Top10/2021/A04_2021-Insecure_Design/
// FIX:
/*
    import rateLimit from "express-rate-limit";
    const aiLimiter = rateLimit({
      windowMs: 60 * 1000,
      max: 5, 
      keyGenerator: (req) => String(req.user?.userId),
    });
    notesRouter.post("/ai", requireAuth, aiLimiter, async (req: AuthRequest, res: Response) => {
      ...
    });
    */

notesRouter.post(
  "/ai",
  requireAuth,
  async (req: AuthRequest, res: Response) => {
    const { prompt } = req.body;

    if (!prompt) {
      res.status(400).json({ error: "Prompt is required" });
      return;
    }

    const response = await placeholder_costly_ai_call(prompt);
    res.json({ response });
  },
);
