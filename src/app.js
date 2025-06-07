import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import chatRouter from "./routes/chat.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config();
const app = express();


app.use(express.json());
app.use(cors());

app.use("/api/chat", chatRouter);
app.use("/api/user", userRouter);

app.get("/", (req, res) => {
  res.send("API está rodando! 🚀");
});

export default app