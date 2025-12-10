import {Router} from "express";
import userAccountController from "../controllers/userAccount.controller.js";
import validate from "../middlewares/validation.middleware.js";
import {requireAdmin, requireAuth, requireSelf, requireSelfOrAdmin} from "../middlewares/authorization.middleware.js";

const router = Router();

router.post('/register', validate('register'), userAccountController.register);
router.post('/login', userAccountController.login);
router.delete('/user/:user', requireAuth, requireSelfOrAdmin, userAccountController.deleteUser);
router.patch('/user/:user', requireAuth, requireSelf, validate('updateUser'), userAccountController.updateUser);
router.patch('/user/:user/role/:role', requireAuth, requireAdmin, validate('changeRole', 'params'), userAccountController.addRole);
router.delete('/user/:user/role/:role', requireAuth, requireAdmin, validate('changeRole', 'params'), userAccountController.deleteRole);
router.patch('/password',  requireAuth, userAccountController.changePassword);
router.get('/user/:user', requireAuth, userAccountController.getUser);

export default router;

