const {Router} = require('express');

const userRouter = require('./userRouter');
const loginRouter = require('./loginRouter')
const signInRouter = require("./signInRouter");

const routes = Router();

routes.use('/login', loginRouter);
routes.use('/signin', signInRouter);
routes.use('/users', userRouter);


routes.get('/error', ({query}, res) => {
    res.render('error', {error: query.error});
});

routes.use((req, res) => {
    res.render('notFound');
});



module.exports = routes;