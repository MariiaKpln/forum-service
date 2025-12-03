import { Schema, model } from "mongoose";

const userSchema = new Schema({
    login: { type: String, required: true }, // теперь login = _id
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true, select: false },
    roles: { type: [String], default: ["USER"] }
}, {
    versionKey: false,
    toJSON: {
        transform: (doc, ret) => {
            delete ret._id;
        }
    }
});

export default model('User', userSchema, 'users');





