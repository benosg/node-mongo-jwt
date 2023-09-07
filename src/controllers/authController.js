import { Router } from "express";
const router = Router();
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { secret } from "../config.js";
import { body, validationResult } from "express-validator";
import verifyToken from "./verifyToken.js";
import User from "../models/User.js";

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
      const existingUser = await User.findOne({ email: email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

      const user = new User({
        username: username,
        email: email,
        password: hashedPassword,
      });

      await user.save();

      const token = jwt.sign({ id: user._id }, secret, {
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
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ auth: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, secret, {
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
    const user = await user.findById(req.userId, { password: 0 });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

export default router;
