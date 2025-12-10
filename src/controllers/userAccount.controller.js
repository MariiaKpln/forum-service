import userAccountService from "../services/user.account.service.js";
import {requireAuth, requireSelf} from "../middlewares/authorization.middleware.js";

class UserAccountController {

    async register(req, res, next) {
        try {
            const userAccount = await userAccountService.register(req.body);
            return res.status(201).json(userAccount);
        } catch (err) {
            next(err);
        }
    }

    async login(req, res, next) {
        try {
            const user = await userAccountService.getUser(req.principal.username);
            return res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const result = await userAccountService.removeUser(req.params.user);
            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async updateUser(req, res, next) {
        try {
            const userAccount = await userAccountService.updateUser(req.params.user, req.body);
            return res.json(userAccount);
        } catch (err) {
            return next(err);
        }
    }


    async addRole(req, res, next) {
        try {
            const result = await userAccountService.changeRoles(req.params.user, req.params.role, true);
            return res.json(result);
        } catch (err) {
            next(err);
        }
    }


    async deleteRole(req, res, next) {
        try {
            const result = await userAccountService.changeRoles(req.params.user, req.params.role, false);
            return res.json(result);
        } catch (err) {
            next(err);
        }
    }

    async changePassword(req, res, next) {
        try {
            await userAccountService.changePassword(req.principal.username, req.body.password);
            return res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }

    async getUser(req, res, next) {
        try {
            const user = await userAccountService.getUser(req.params.user);
            return res.json(user);
        } catch (err) {
            next(err);
        }
    }
}

export default new UserAccountController();

