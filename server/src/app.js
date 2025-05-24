import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import { generateKeys } from "./libs/paillierKeys.js";

import keyRoutes from "./routes/keyRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import roomRoutes from "./routes/roomRoutes.js";
import optionRoutes from "./routes/optionRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";


const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Initialize the public/private key pair


// Routes
app.use("/keys", keyRoutes);
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/rooms", roomRoutes);
app.use("/options", optionRoutes);
app.use("/votes", voteRoutes);


const PORT = process.env.PORT || 3000;
generateKeys().then(() => {
  
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  });
