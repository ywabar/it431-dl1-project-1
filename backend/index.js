import cors from "cors";
import express from "express";
import { initializeDbConnection, getDbConnection } from "./src/db.js";
import dotenv from "dotenv";
import productsRoutes from "./src/productsRoutes.js";
import userRoutes from "./src/userRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config({ path: "./env" });

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

export let databaseConnection = null;

app.use("/products", productsRoutes);
app.use("/user", userRoutes);

initializeDbConnection()
  .then(() => {
    databaseConnection = getDbConnection("it341project2");
    console.log("MongoDB connection established successfully");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to establish MongoDB connection:", error);
  });
