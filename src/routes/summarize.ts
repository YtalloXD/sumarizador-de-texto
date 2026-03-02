import express, { Request, Response } from "express";
import { summarizeSchema } from "../schemas/validation.js";
import { summarizeText } from "../services/aiService.js";

const router = express.Router();

router.post("/sumarizar", async (req: Request, res: Response) => {
  try {
    const { text, maxSentences } = summarizeSchema.parse(req.body);
    const sentencesCount = maxSentences || 3;

    const summary = await summarizeText(text, sentencesCount);

    return res.json({
      summary,
      meta: {
        maxSentences: sentencesCount,
        model: "gemini",
        characters: text.length,
      },
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ error: error.errors });
    }

    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

export default router;
