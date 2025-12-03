import User from '../models/user.account.model.js';
import Post from "../models/post.model.js";

class UserRepository {
    async registerUser(userData) {
        const user = new User(userData);
        return await user.save();
    }
   async deleteUser(login) {
        return await User.findOneAndDelete({login});
   }

   async updateUser(login, userData) {
        return await User.findOneAndUpdate({login}, userData, {new: true});
    }

    async addRole(login, role) {
        return await User.findOneAndUpdate({ login }, { $addToSet: { roles: role } }, { new: true });
    }


    async deleteRole(login, role) {
        return await User.findOneAndUpdate({login}, {$pull: {roles: role}}, { new: true })
    }

    async getUser(login) {
        const userData = await User.findOne({ login });
        console.log(userData);
        return userData;
    }

}

export default new UserRepository();