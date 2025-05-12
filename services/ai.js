import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const respostaGpt = async (respostaFront) => {
  app.post("/api/gpt", async (req, res) => {
    const { prompt } = req.body;

    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
      });

      const reply = response.data.choices[0].message.content;
      res.json({ response: reply });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erro ao se comunicar com a OpenAI" });
    }
  });

  app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });
};

// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export const exportResponse = async (respostaFront) => {
//   const tweetTexts = tweets.map((t) => t.text).join("\n\n");

//   const prompt = `Verifique se a resolução do exercicio está correta e avalie... \n\n ${respostaFront}`;

//   try {
//     const response = await openai.chat.completions.create({
//       messages: [
//         {
//           role: "system",
//           content:
//             "Você é um assistente que analisa tweets sobre e-sports com foco na FURIA e CS:GO.",
//         },
//         { role: "user", content: prompt },
//       ],
//       model: "gpt-4o-mini",
//     });

//     return response.choices[0].message.content;
//   } catch (error) {
//     console.error("Erro ao resumir tweets: ", error.message);
//     return error;
//   }
// };

// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const axios = require('axios');

// const app = express();
// const port = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// const OPENAI_API_KEY = 'SUA_CHAVE_DA_OPENAI_AQUI';

// app.listen(port, () => {
//   console.log(`Servidor rodando em http://localhost:${port}`);
// });
