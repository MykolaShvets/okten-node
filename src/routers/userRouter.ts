import { Router } from 'express';
import { userController } from '../controllers/userController';
import { userMiddleware } from '../middlewares';

const router = Router();

router.get('/', userController.getAll);
router.post('/', userMiddleware.validateCreateUser, userController.createUser);
router.get('/:email', userController.getUserByEmail);
router.patch('/:id', userMiddleware.validateId, userController.updateById);
router.delete('/:id', userMiddleware.validateId, userController.deleteById);

export const userRouter = router;
