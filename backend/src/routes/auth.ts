import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export const authRouter = Router();

const JWT_SECRET = process.env["JWT_SECRET"] ?? "secret";

authRouter.post("/register", async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "username and password are required" });
    return;
  }

  // VULNERABILITY 4: No password hashing
  // LINK: https://owasp.org/Top10/2021/A02_2021-Cryptographic_Failures/
  // FIX:
  /*
  import bcrypt from "bcrypt";
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ username: String(username), password: hashedPassword });
  */

  const user = await User.create({
    username: String(username),
    password: String(password),
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
  if (!user || user.password !== password) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  // VULNERABILITY 3: Login tokens never expire
  // LINK: https://owasp.org/Top10/2021/A07_2021-Identification_and_Authentication_Failures/
  // FIX:
  /*
  const token = jwt.sign(
    { userId: user.id, username: user.username },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
  */
  const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET);

  res.json({ token });
});
