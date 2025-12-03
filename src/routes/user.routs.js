import { Router } from "express";
import userController from "../controllers/userAccount.controller.js";
import validate from "../middlewares/validation.middleware.js";

const router = Router();

router.post('/register', validate('registerUser'), userController.registerUser);
router.delete('/user/:user', userController.deleteUser);
router.patch('/user/:user', validate('updateUser'),userController.updateUser);
router.patch('/user/:user/role/:role', userController.addRole);
router.delete('/user/:user/role/:role', userController.removeRole);
router.get('/user/:user', userController.getUser);

export default router;

