import express, { Response, Request } from 'express';
import { user } from './user';

const app = express();
console.log(user);

app.get('/', (req: Request, res: Response) => {
    res.end();
});

app.listen(5000, () => {
    console.log('Server has started!');
});
