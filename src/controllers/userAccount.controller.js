import userAccountService from "../services/user.account.service.js";
import UserAccount from "../models/user.account.model.js";
import {requireAuth, requireSelf, requireSelfOrAdmin} from "../middlewares/authorization.middleware.js";

class UserAccountController {
    async register(req, res, next) {
        try {
            const userAccount = await userAccountService.register(req.body);
            return res.status(201).json(userAccount);
        } catch (err) {
            return next(err);
        }
    }

    async login(req, res, next) {
        const userAccount = await userAccountService.getUser(req.principal.username);
        return res.json(userAccount);
    }

    async deleteUser(req, res, next) {
        try {
            requireSelfOrAdmin(req);

            const targetLogin = req.params.user;
            const userAccount = await userAccountService.removeUser(targetLogin);

            return res.json(userAccount);

        } catch (err) {
            return next(err);
        }
    }


    async updateUser(req, res, next) {
        try {
            requireSelf(req);  // выбросит 401 или 403, если не соответствует
            const userAccount = await userAccountService.updateUser(req.params.user, req.body);
            return res.json(userAccount);
        } catch (err) {
            return next(err);
        }
    }




    async addRole(req, res, next) {
        try {
            const {user, role} = req.params;
            const isAdmin = req.principal.roles.includes('ADMIN');
            if (isAdmin) {
                const userRoles = await userAccountService.changeRoles(user, role, true);
                return res.json(userRoles);
            }
        } catch (err) {
            return next(err);
        }
    }

    async deleteRole(req, res, next) {
        try {
            const {user, role} = req.params;
            const isAdmin = req.principal.roles.includes('ADMIN');
            if (isAdmin) {
                const userRoles = await userAccountService.changeRoles(user, role, false);
                return res.json(userRoles);
            }
        } catch (err) {
            return next(err);
        }
    }

    async changePassword(req, res, next) {
        await userAccountService.changePassword(req.principal.username, req.body.password);
        return res.sendStatus(204);
    }


    async getUser(req, res, next) {
        try {
            if (req.principal) {
                const userAccount = await userAccountService.getUser(req.params.user);
                return res.json(userAccount);
            }
        } catch (err) {
            return next(err);
        }
    }
}


export default new UserAccountController();
