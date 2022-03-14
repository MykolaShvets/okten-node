import { Router } from 'express';
import { userController } from '../controllers/userController';

const router = Router();

router.get('/', userController.getAll);
router.post('/', userController.createUser);
router.get('/:email', userController.getByEmail);
router.patch('/:id', userController.updateById);
router.delete('/:id', userController.deleteById);

export const userRouter = router;
