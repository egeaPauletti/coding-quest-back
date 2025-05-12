const express = require("express");
const router = express.Router();
const { sendPromptToOpenAI } = require("../services/openAiService");

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await sendPromptToOpenAI(prompt);
    res.send(`<p>${response}</p>`);
  } catch (error) {
    res.status(500).send(`<p>Erro ao gerar resposta da IA.</p>`);
  }
});

module.exports = router;
