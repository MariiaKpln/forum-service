import UserRepository from '../repositories/user.account.repository.js';


class UserAccountService {
    async registerUser(user) {
     return await UserRepository.registerUser(user)
    }

    async loginUser(login) {
       //TODO login user
    }

    async deleteUser(login) {
        const user = await UserRepository.deleteUser(login);
        if(!user) {
            throw new Error(`User with login ${login} not found`)
        }
      return user;
    }
    async updateUser(login, user) {
       const updatedUser = await UserRepository.updateUser(login, user);
        if(!updatedUser) {
            throw new Error(`User with login ${login} not found`)
        }
       return updatedUser;
    }


    async changeRoles(login, role, isAddRole) {
        const user = await UserRepository.getUser(login);
        if (!user) {
            throw new Error(`User "${login}" not found`);
        }
        if (isAddRole) {
            if (user.roles.includes(role)) {
                throw new Error(`Role "${role}" already exists for user "${login}"`);
            }
            return await UserRepository.addRole(login, role);
        }
        if (!user.roles.includes(role)) {
            throw new Error(`Role "${role}" does not exist for user "${login}"`);
        }
        return await UserRepository.deleteRole(login, role);
    }


    async changePassword(login, newPassword) {
        //TODO update password
    }

    async getUser(user) {
       const userData = UserRepository.getUser(user);
       if(!userData.login) {
           throw new Error(`User with login ${user} not found`)
       }
       return userData;
    }

}
export default new UserAccountService();