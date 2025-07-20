import { promises as fs } from 'fs';
import path from 'path';
import { WordEntry } from '../models/word.model';

const dbFile = path.join(__dirname, '../../data/words.json');

export async function readWords(): Promise<WordEntry[]> {
    try {
        const data = await fs.readFile(dbFile, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

export async function writeWords(words: WordEntry[]): Promise<void> {
    await fs.writeFile(dbFile, JSON.stringify(words, null, 2), 'utf-8');
}
