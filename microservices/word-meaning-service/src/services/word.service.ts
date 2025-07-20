import { readWords, writeWords } from '../utils/fileDb';
import { WordEntry } from '../models/word.model';

export async function getAllWords(): Promise<WordEntry[]> {
    return await readWords();
}

export async function getWord(word: string): Promise<WordEntry | undefined> {
    const words = await readWords();
    return words.find(w => w.word === word);
}

export async function createWord(entry: WordEntry): Promise<void> {
    const words = await readWords();
    words.push(entry);
    await writeWords(words);
}

export async function updateWord(word: string, meanings: string[]): Promise<boolean> {
    const words = await readWords();
    const idx = words.findIndex(w => w.word === word);
    if (idx === -1) return false;
    words[idx].meanings = meanings;
    await writeWords(words);
    return true;
}

export async function deleteWord(word: string): Promise<boolean> {
    const words = await readWords();
    const filtered = words.filter(w => w.word !== word);
    if (filtered.length === words.length) return false;
    await writeWords(filtered);
    return true;
}
