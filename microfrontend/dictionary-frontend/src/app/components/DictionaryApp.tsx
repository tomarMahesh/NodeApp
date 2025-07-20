'use client';
import { useEffect, useState } from 'react';

interface WordEntry {
    word: string;
    meanings: string[];
}

export default function DictionaryApp() {
    const [words, setWords] = useState<WordEntry[]>([]);
    const [newWord, setNewWord] = useState('');
    const [newMeanings, setNewMeanings] = useState('');

    const API_BASE_URL = 'http://localhost:3001/api'; // Adjust backend URL/port as needed

    const fetchWords = async () => {
        const res = await fetch(`${API_BASE_URL}/words`);
        const data = await res.json();
        setWords(data);
    };

    const addWord = async () => {
        await fetch(`${API_BASE_URL}/words`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                word: newWord,
                meanings: newMeanings.split(',').map(m => m.trim()),
            }),
        });
        setNewWord('');
        setNewMeanings('');
        fetchWords();
    };

    const deleteWord = async (word: string) => {
        await fetch(`${API_BASE_URL}/words/${word}`, { method: 'DELETE' });
        fetchWords();
    };

    useEffect(() => {
        fetchWords();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h1>Dictionary App</h1>

            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Word"
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <input
                    type="text"
                    placeholder="Meanings (comma-separated)"
                    value={newMeanings}
                    onChange={(e) => setNewMeanings(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <button onClick={addWord} style={{ padding: '10px', width: '100%' }}>
                    Add Word
                </button>
            </div>

            <h2>All Words</h2>
            <ul>
                {words.map((entry) => (
                    <li key={entry.word} style={{ marginBottom: '10px' }}>
                        <b>{entry.word}:</b> {entry.meanings.join(', ')}
                        <button
                            onClick={() => deleteWord(entry.word)}
                            style={{
                                marginLeft: '10px',
                                backgroundColor: 'red',
                                color: 'white',
                                border: 'none',
                                padding: '5px 10px',
                                cursor: 'pointer',
                            }}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
