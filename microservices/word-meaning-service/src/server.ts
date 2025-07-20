import app from './app';

const PORT = 3001;

const port = process.argv[2] || 3000;
app.listen(port, () => console.log(`Backend running on port ${port}`));