import express, {Router} from 'express'
import mongoose from 'mongoose'
import config from "./config/config.js"
import postRoutes from "./routes/post.routes.js"
import userAccountRoutes from "./routes/user.routs.js";
import errorHandler from "./middlewares/error.middleware.js";
import authentification from "./middlewares/authentication.middleware.js";
import {createAdmin} from "./config/initAdmin.js";
import authorization from "./middlewares/authorization.middleware.js";
import {ADMIN} from "./config/constants.js";
import cors from "./config/cors.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




const app = express()
const router = Router();
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors);
app.use(express.json());
app.use(authentification);

router.all('/account/user/:user/role/:role', authorization.isOwnerOrHasRole('user', ADMIN))
router.patch(['/account/user/:user', '/forum/post/:id/comment/:user'], authorization.isOwner('user'))
router.delete('/account/user/:user', authorization.isOwnerOrHasRole('user', ADMIN))
router.post('/forum/post/:author', authorization.isOwner('author'))
router.post('/forum/post/:id', authorization.isPostAuthor("id"))
router.delete('/forum/post/:id', authorization.isPostAuthorOrHasRole("id"))


app.use(router);
app.use('/forum', postRoutes)
app.use('/account', userAccountRoutes);
// app.use(/^\/account\/user\/\w+\/role\/w+$/, authorization.hasRole('ADMIN'))



app.use(errorHandler)

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb.uri, config.mongodb.db)
        await createAdmin();
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.log('MongoDB connection error', error)
    }
}

const startServer = async () => {
    await connectDB()
    app.listen(config.port, () => console.log(`Server started on port ${config.port}. Press Ctrl-C to finish`));
}

startServer()