import express from "express";
import sendPromptToOpenAI from "../services/openAiService.js";

const chatRouter = express.Router();

chatRouter.post("/", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await sendPromptToOpenAI(prompt);
    res.send(`<p>${response}</p>`);
  } catch (error) {
    res.status(500).send(`<p>Erro ao gerar resposta da IA.</p>`);
  }
});

export default chatRouter