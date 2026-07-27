import dotenv from "dotenv";
import OpenAI from "openai";

// carregar env cedo para que a chave esteja disponível quando o módulo é avaliado
dotenv.config();

let openai: OpenAI | undefined;

function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY não configurada");
  }

  openai ??= new OpenAI({ apiKey });
  return openai;
}

export async function summarizeText(
  text: string,
  maxSentences: number = 3,
): Promise<string> {
  const instructions = `Você é um assistente de sumarização. Resuma o texto fornecido em no máximo ${maxSentences} frases.

Regras:
- Não invente fatos.
- Não adicione introduções como "Aqui está o resumo".
- Retorne apenas o resumo.`;

  const response = await getOpenAIClient().responses.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    instructions,
    input: text,
  });

  const summary = response.output_text.trim();

  if (!summary) {
    throw new Error("A OpenAI não retornou um resumo");
  }

  return summary;
}
