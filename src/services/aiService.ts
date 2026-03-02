import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

// carregar env cedo para que a chave esteja disponível quando o módulo é avaliado
dotenv.config();

// criar uma única instância de cliente
const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function summarizeText(
  text: string,
  maxSentences: number = 3,
): Promise<string> {
  // construir o prompt de acordo com as especificações do projeto
  const prompt = `Você é um assistente de sumarização. Resuma o texto abaixo em no máximo ${maxSentences} frases.

Regras:
- Não invente fatos.
- Não adicione introduções como "Aqui está o resumo".
- Retorne apenas o resumo.

Texto: ${text}`;

  // chamar a API dos modelos usando o campo `contents`
  const resp = await gemini.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash",
    contents: prompt,
  });

  // propriedade auxiliar `text` concatena partes de texto do primeiro candidato
  if (resp && typeof resp.text === "string") {
    return resp.text;
  }

  // retornar string vazia como fallback se algo inesperado acontecer
  return "";
}
