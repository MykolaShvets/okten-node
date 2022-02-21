const {Router} = require('express');

const loginController = require('../controllers/loginController')
const loginMiddleware = require('../middlewares/loginMiddleware');

const loginRouter = Router();

loginRouter.get('/', loginController.renderForm)


loginRouter.post('/', loginMiddleware.isDataValid, loginMiddleware.isEmailUnic, loginController.createUser);


module.exports = loginRouter;