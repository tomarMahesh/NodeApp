import { Router, Request, Response } from "express";
import fs from "fs-extra";
import path from "path";

interface WordEntry {
  word: string;
  meanings: string[];
}

const router = Router();
const dataFile = path.join(__dirname, "dictionary.json");

// ✅ Helper to read/write JSON
async function readData(): Promise<WordEntry[]> {
  if (!(await fs.pathExists(dataFile))) return [];
  return fs.readJSON(dataFile);
}

async function writeData(data: WordEntry[]) {
  await fs.writeJSON(dataFile, data, { spaces: 2 });
}

// ✅ GET all words
router.get("/words", async (_req: Request, res: Response) => {
  const words = await readData();
  res.json(words);
});

// ✅ GET a specific word
router.get("/words/:word", async (req: Request, res: Response) => {
  const { word } = req.params;
  const words = await readData();
  const entry = words.find((w) => w.word.toLowerCase() === word.toLowerCase());
  if (!entry) return res.status(404).json({ message: "Word not found" });
  res.json(entry);
});

// ✅ POST create new word
router.post("/words", async (req: Request, res: Response) => {
  const { word, meanings } = req.body;
  if (!word || !Array.isArray(meanings)) {
    return res.status(400).json({ message: "Invalid input" });
  }
  const words = await readData();
  if (words.find((w) => w.word.toLowerCase() === word.toLowerCase())) {
    return res.status(400).json({ message: "Word already exists" });
  }
  words.push({ word, meanings });
  await writeData(words);
  res.status(201).json({ message: "Word created" });
});

// ✅ PUT update meanings of a word
router.put("/words/:word", async (req: Request, res: Response) => {
  const { word } = req.params;
  const { meanings } = req.body;

  if (!Array.isArray(meanings)) {
    return res.status(400).json({ message: "Meanings must be an array" });
  }

  const words = await readData();
  const index = words.findIndex((w) => w.word.toLowerCase() === word.toLowerCase());
  if (index === -1) return res.status(404).json({ message: "Word not found" });

  words[index].meanings = meanings;
  await writeData(words);
  res.json({ message: "Word updated", word: words[index] });
});

// ✅ DELETE a word
router.delete("/words/:word", async (req: Request, res: Response) => {
  const { word } = req.params;
  let words = await readData();
  const newWords = words.filter((w) => w.word.toLowerCase() !== word.toLowerCase());
  if (newWords.length === words.length) {
    return res.status(404).json({ message: "Word not found" });
  }
  await writeData(newWords);
  res.json({ message: "Word deleted" });
});

export default router;
