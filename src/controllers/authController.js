import { Router } from "express";
const router = Router();
import { sign } from "jsonwebtoken";
import { hash, compare } from "bcryptjs"; // Import bcrypt for password hashing
import { secret } from "../config";
import { body, validationResult } from "express-validator";
import verifyToken from "./verifyToken";
import User, { findOne, findById } from "../models/User";

// POST: User Signup
router.post(
  "/signup",
  [
    body("username").trim().notEmpty().escape(),
    body("email").isEmail().normalizeEmail(),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
      // Check if email already exists
      const existingUser = await findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const hashedPassword = await hash(password, 10); // Hash the password

      const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });

      await user.save();

      const token = sign({ id: user._id }, secret, {
        expiresIn: "1d",
      });

      res.json({ auth: true, token });
    } catch (error) {
      next(error);
    }
  }
);

// POST: User Signin
router.post("/signin", async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ auth: false, message: "Invalid password" });
    }

    const token = sign({ id: user._id }, secret, {
      expiresIn: "1d",
    });

    res.json({ auth: true, token });
  } catch (error) {
    next(error);
  }
});

// GET: User Profile
router.get("/me", verifyToken, async (req, res, next) => {
  try {
    const user = await findById(req.userId, { password: 0 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
