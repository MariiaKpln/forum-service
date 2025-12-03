import userAccountService from "../services/user.account.service.js";

class UserAccountController {
async registerUser(req, res, next) {
    try {
        const user = await userAccountService.registerUser(req.body);
        return res.json(user);
    } catch (error) {
        return next(error);
    }
}
async deleteUser(req, res, next) {
    try {
        const user = await userAccountService.deleteUser(req.params.user);
        return res.json(user);
    } catch (error) {
        return next(error);
    }
}
async updateUser(req, res, next) {
    try {
        const user = await userAccountService.updateUser(req.params.user, req.body);
        return res.json(user);
    }
    catch (error) {
        return next(error);
    }
}
    async addRole(req, res, next) {
        try {
            const user = await userAccountService.changeRoles(
                req.params.user,
                req.params.role,
                true
            );
            res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async removeRole(req, res, next) {
        try {
            const user = await userAccountService.changeRoles(
                req.params.user,
                req.params.role,
                false
            );
            res.json(user);
        } catch (err) {
            next(err);
        }
    }

    async getUser(req, res, next) {
        try {
            const user = await userAccountService.getUser(req.params.user);
            return res.json(user);
        }
        catch (err) {
            next(err);
        }
    }

}

export default new UserAccountController();