import UserAccount from '../models/user.account.model.js';
import {ADMIN, MODERATOR, USER} from "./constants.js";

export async function createAdmin() {
    let admin = await UserAccount.findById('admin');
    if(!admin) {
        admin = new UserAccount({
            login: 'admin',
            password: 'admin',
            firstName: 'Admin',
            lastName: 'Admin',
            roles: [USER, MODERATOR, ADMIN]
        });
        await admin.save();
    }
}