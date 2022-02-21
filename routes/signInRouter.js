const {Router} = require('express');

const signInController = require('../controllers/signInController');
const signInMiddleware = require('../middlewares/signInMiddleware');

const signInRouter = Router();


signInRouter.get('/', signInController.renderForm);

signInRouter.post('/', signInMiddleware.checkUserAuth , signInController.signIn)

module.exports = signInRouter;