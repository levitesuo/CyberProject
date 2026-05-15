import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";

export const authRouter = Router();

const JWT_SECRET = process.env["JWT_SECRET"] ?? "secret";

authRouter.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "username and password are required" });
    return;
  }

  if (await User.findOne({ where: { username } })) {
    res.status(409).json({ error: "Username already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    username: String(username),
    password: hashedPassword,
  });

  res.status(201).json({ id: user.id, username: user.username });
});

authRouter.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body as {
    username: unknown;
    password: unknown;
  };

  if (!username || !password) {
    res.status(400).json({ error: "username and password are required" });
    return;
  }

  const user = await User.findOne({ where: { username } });
  if (!user || !bcrypt.compareSync(String(password), user.password)) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" },
  );

  res.json({ token });
});
