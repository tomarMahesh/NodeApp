import { Request, Response } from 'express';
import * as service from '../services/word.service';

export async function getAll(req: Request, res: Response) {
    res.json(await service.getAllWords());
}

export async function get(req: Request, res: Response) {
    const word = req.params.word;
    const entry = await service.getWord(word);
    if (!entry) return res.status(404).json({ message: 'Word not found' });
    res.json(entry);
}

export async function create(req: Request, res: Response) {
    const { word, meanings } = req.body;
    if (!word || !Array.isArray(meanings)) {
        return res.status(400).json({ message: 'Invalid request' });
    }
    await service.createWord({ word, meanings });
    res.status(201).json({ message: 'Word added' });
}

export async function update(req: Request, res: Response) {
    const { meanings } = req.body;
    const word = req.params.word;
    const success = await service.updateWord(word, meanings);
    if (!success) return res.status(404).json({ message: 'Word not found' });
    res.json({ message: 'Word updated' });
}

export async function remove(req: Request, res: Response) {
    const word = req.params.word;
    const success = await service.deleteWord(word);
    if (!success) return res.status(404).json({ message: 'Word not found' });
    res.json({ message: 'Word deleted' });
}
    