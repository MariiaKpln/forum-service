import userAccountService from "../services/user.account.service.js";
import UserAccount from "../models/user.account.model.js";

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
            const principalLogin = req.principal.username;     // логин авторизованного пользователя
            const targetLogin = req.params.user;               // логин пользователя, которого хотят удалить

            const isAdmin = req.principal.roles.includes('ADMIN');
            const isSelf = principalLogin === targetLogin;

            if (isAdmin || isSelf) {
                const userAccount = await userAccountService.removeUser(targetLogin);
                return res.json(userAccount);
            }

        } catch (err) {
            return next(err);
        }
    }

    async updateUser(req, res, next) {
        try {
            const principalLogin = req.principal.username;
            const targetLogin = req.params.user;
            const isSelf = principalLogin === targetLogin;

            if (!isSelf) {
                return next({message: 'Invalid credentials', statusCode: 403});
            }

            const userAccount = await userAccountService.updateUser(targetLogin, req.body);
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
            if (!req.principal) {
                return next({message: 'Unauthorized', status: 401});
            }
            const userAccount = await userAccountService.getUser(req.params.user);
            return res.json(userAccount);
        } catch (err) {
            return next(err);
        }
    }
}


export default new UserAccountController();