import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import summarizeRouter from "./routes/summarize.js";

// carregar variáveis de ambiente

dotenv.config();

// mostrar se a chave OpenAI está disponível (comprimento mascarado por segurança)
const rawKey = process.env.OPENAI_API_KEY || "";
console.log(
  "OPENAI_API_KEY present:",
  rawKey.length > 0 ? "*".repeat(Math.min(4, rawKey.length)) + "..." : "não",
);

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// montar nosso roteador de sumarização no caminho raiz
app.use("/", summarizeRouter);

const PORT = process.env.PORT ? Number(process.env.PORT) : 3000;
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} (model=${MODEL})`);
});
