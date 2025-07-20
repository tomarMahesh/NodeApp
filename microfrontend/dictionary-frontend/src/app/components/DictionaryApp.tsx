'use client';
import { useEffect, useState, useCallback } from 'react';

interface WordEntry {
    word: string;
    meanings: string[];
}

export default function DictionaryApp() {
    const [words, setWords] = useState<WordEntry[]>([]);
    const [newWord, setNewWord] = useState('');
    const [newMeanings, setNewMeanings] = useState('');
    const [backendUrl, setBackendUrl] = useState<string | null>(null);

    // Get backend URL once, client-side only
    useEffect(() => {
        const url = new URL(window.location.href).searchParams.get('backend') ?? 'http://localhost:3000';

        setBackendUrl(url);
    }, []);

    const API_BASE_URL = backendUrl ? backendUrl + '/api' : 'http://localhost:3000/api';

    // Use useCallback to memoize fetchWords
    const fetchWords = useCallback(async () => {
        if (!API_BASE_URL) return;   // Wait for backend URL
        const res = await fetch(`${API_BASE_URL}/words`);
        const data = await res.json();
        setWords(data);
    }, [API_BASE_URL]);

    const addWord = async () => {
        if (!API_BASE_URL) return;
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
        if (!API_BASE_URL) return;
        await fetch(`${API_BASE_URL}/words/${word}`, { method: 'DELETE' });
        fetchWords();
    };

    // Fetch words after backend URL is set
    useEffect(() => {
        if (backendUrl) {
            fetchWords();
        }
    }, [backendUrl, fetchWords]);

    if (!backendUrl) return <p>Loading backend...</p>;  // Loader placeholder

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