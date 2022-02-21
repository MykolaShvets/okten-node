const {Router} = require('express');

const usersController = require('../controllers/usersController');
const usersMiddleware = require('../middlewares/usersMiddleware');

const userRouter = Router();


userRouter.get('/', usersController.getAll);

userRouter.get('/:userId', usersMiddleware.isIdValid, usersController.getCurrent);



module.exports = userRouter;