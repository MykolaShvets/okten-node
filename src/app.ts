import 'reflect-metadata';
import express from 'express';
import { createConnection } from 'typeorm';

// import { Post } from './entity/post';
// import { Comment } from './entity/comment';
import { apiRouter } from './routers/apiRouter';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

// app.get('/posts', async (req: Request, res: Response) => {
//     try {
//         const posts = await getManager().getRepository(Post).find();
//         res.json(posts);
//     } catch (e) {
//         console.log(e);
//     }
// });
//
// app.post('/post', async (req: Request, res: Response) => {
//     try {
//         const createdPost = await getManager().getRepository(Post).save(req.body);
//         res.json(createdPost);
//     } catch (e) {
//         console.log(e);
//     }
// });
//
// app.get('/posts/:userId', async (req: Request, res: Response) => {
//     try {
//         const user = await getManager().getRepository(Post)
//             .createQueryBuilder('post')
//             .where('post.userId = :userId', { userId: +req.params.userId })
//             .leftJoin('User', 'user', 'user.id = post.userId')
//             .getMany();
//         res.json(user);
//     } catch (e) {
//         console.log(e);
//     }
// });
//
// app.patch('/post/:postId', async (req: Request, res: Response) => {
//     try {
//         const { title, text } = req.body;
//         const updatedPost = await getManager()
//             .getRepository(Post)
//             .update({ id: Number(req.params.postId) }, { title, text });
//         res.json(updatedPost);
//     } catch (e) {
//         console.log(e);
//     }
// });
//
// app.post('/comments', async (req: Request, res: Response) => {
//     try {
//         const comments = await getManager()
//             .getRepository(Comment)
//             .save(req.body);
//         res.json(comments);
//     } catch (e) {
//         console.log(e);
//     }
// });
//
// app.get('/cooments/:userId', async (req: Request, res: Response) => {
//     try {
//         const comments = await getManager()
//             .getRepository(Comment)
//             .createQueryBuilder('comment')
//             .where('comment.authorId = :id', { id: Number(req.params.userId) })
//             .leftJoinAndSelect('comment.user', 'user')
//             .leftJoinAndSelect('comment.post', 'post')
//             .getMany();
//         res.json(comments);
//     } catch (e) {
//         console.log(e);
//     }
// });
//
// app.post('/comments/action', async (req: Request, res: Response) => {
//     try {
//         const { action, commentId } = req.body;
//
//         const comment = await getManager().getRepository(Comment).createQueryBuilder('comment')
//             .where('comment.id = :id', { id: commentId })
//             .getOne();
//
//         if (!comment) {
//             throw new Error('wrong comment ID');
//         }
//
//         if (action === 'like') {
//             await getManager().getRepository(Comment)
//                 .update({ id: commentId }, { like: comment.like + 1 });
//         }
//
//         if (action === 'dislike') {
//             await getManager().getRepository(Comment)
//                 .update({ id: commentId }, { dislike: comment.dislike + 1 });
//         }
//
//         res.sendStatus(201);
//     } catch (e) {
//         console.log(e);
//     }
// }); // зролблю пізніше контроллери для постів і коментів

const { PORT } = process.env;

app.listen(PORT, async () => {
    console.log(`Server has started! on port - ${PORT} `);

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
