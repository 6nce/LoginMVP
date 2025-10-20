import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);

const PORT = 8080;
app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));