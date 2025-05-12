const express = require("express");
const path = require("path");
require("dotenv").config();

const chatRoute = require("./routes/chat");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use("/api/chat", chatRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
