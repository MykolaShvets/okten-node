import 'reflect-metadata';
import express, { Response, Request } from 'express';
import { createConnection } from 'typeorm';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.end();
});

app.listen(5000, async () => {
    console.log('Server has started!');

    try {
        const connection = await createConnection();
        if (connection) {
            console.log('Database connected');
        }
    } catch (err) {
        if (err) {
            console.log(err);
        }
    }
});
