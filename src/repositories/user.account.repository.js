import UserAccount from '../models/user.account.model.js';
import bcrypt from "bcrypt";
import {ADMIN} from "../config/constants.js";

class UserAccountRepository {
    async addUser(user) {
        console.log(user);
        const userAccount = new UserAccount(user);
        return userAccount.save();
    }

    async findUser(login) {
        return UserAccount.findById(login);
    }

    async removeUser(login) {
            return UserAccount.findByIdAndDelete(login);
    }

    async updateUser(login, user){
        return UserAccount.findByIdAndUpdate(login, user, {new: true});
    }

    async addRole(login, role) {
        return UserAccount.findByIdAndUpdate(login, {$addToSet: {roles: role}}, {new: true});
    }

    async removeRole(login, role) {
        return UserAccount.findByIdAndUpdate(login, {$pull: {roles: role}}, {new: true});
    }

    async changePassword(login, password) {
        const hashedPassword = await bcrypt.hash(password, 12);

        return UserAccount.findByIdAndUpdate(
            login,
            { password: hashedPassword },
            { new: true }
        );
    }

}

export default new UserAccountRepository();