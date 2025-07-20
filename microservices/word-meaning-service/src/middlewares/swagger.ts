import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import { Express } from 'express';

const options = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'Word API', version: '1.0.0' }
    },
    apis: ['./src/routes/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

export function setupSwagger(app: Express) {
    if (process.env.NODE_ENV !== 'production') {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    }
}
