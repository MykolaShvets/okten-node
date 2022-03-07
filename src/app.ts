import express, { Response, Request } from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.end();
});

app.listen(5000, () => {
    console.log('Server has started!');
});
