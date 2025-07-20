import app from './app';

const PORT = 3001;


app.listen(PORT, () => {
    console.log(`Word Microservice running on port ${PORT}`);
});
