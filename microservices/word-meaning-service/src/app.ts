import express from 'express';
import wordRoutes from './routes/word.routes';
import { setupSwagger } from './middlewares/swagger';
import cors from 'cors';

const app = express();
app.use(cors());  // 👈 This allows requests from any origin
app.use(express.json());


setupSwagger(app);

app.use('/api', wordRoutes);

export default app;