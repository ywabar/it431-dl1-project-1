import express from "express";
import { ObjectId } from "mongodb";
const router = express.Router();

import { databaseConnection } from "../index.js";
import {
  comparePassword,
  generateToken,
  hashPassword,
  verifyToken,
} from "./password.js";

// get current user
router.get("/", async (req, res) => {
  try {
    const { credentials } = req.cookies;
    if (!credentials) {
      res.cookie("credentials", null);
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userCredentialData = await verifyToken(credentials);
    if (!userCredentialData) {
      res.cookie("credentials", null);
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await databaseConnection.collection("users").findOne({
      _id: new ObjectId(userCredentialData.id),
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userInfo = {
      email: user.email,
      name: user.name,
      createdAt: user.createdAt,
    };

    res.json({ userInfo, message: "User fetched successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// register user
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return res.status(400).json({ message: "Missing fields are required" });
    }

    const existingUser = await databaseConnection
      .collection("users")
      .findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await databaseConnection.collection("users").insertOne({
      email,
      hashedPassword,
      name,
      createdAt: new Date().toLocaleString(),
    });

    const newUserData = await databaseConnection.collection("users").findOne({
      _id: newUser.insertedId,
    });

    const token = await generateToken(newUserData);

    // Set the cookie first, then send the JSON response.
    res.cookie("credentials", token);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Missing fields are required" });
    }

    const user = await databaseConnection
      .collection("users")
      .findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await comparePassword(
      password,
      user.hashedPassword
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = await generateToken(user);

    res.cookie("credentials", token);
    res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { credentials } = req.cookies;
    if (!credentials) {
      res.cookie("credentials", null);
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userCredentialData = await verifyToken(credentials);
    if (!userCredentialData) {
      res.cookie("credentials", null);
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.cookie("credentials", null);
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { credentials } = req.cookies;
    if (!credentials) {
      res.cookie("credentials", null);
      return res.status(401).json({ message: "Unauthorized" });
    }

    const userCredentialData = await verifyToken(credentials);
    if (!userCredentialData) {
      res.cookie("credentials", null);
      return res.status(401).json({ message: "Unauthorized" });
    }

    await databaseConnection.collection("users").deleteOne({
      _id: new ObjectId(userCredentialData.id),
    });

    res.cookie("credentials", null);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
