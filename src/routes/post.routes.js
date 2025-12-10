import {Router} from "express";
import postController from "../controllers/post.controller.js";
import validate from "../middlewares/validation.middleware.js";
import {
    requireAuth,
    requirePostAuthor,
    requirePostAuthorOrModerator,
    requireSelf
} from "../middlewares/authorization.middleware.js";

const router = Router();

router.post('/post/:user', requireAuth, requireSelf, validate('createPost'), postController.createPost)
router.get('/post/:id',requireAuth, postController.getPostById)
router.delete('/post/:id', requireAuth, requirePostAuthorOrModerator, postController.deletePost)
router.patch('/post/:id/like', requireAuth, postController.addLike);
router.get('/posts/author/:author', postController.getPostsByAuthor);
router.patch('/post/:id/comment/:commenter', requireAuth, requirePostAuthor, validate('addComment'), postController.addComment);
router.get('/posts/tags', postController.getPostsByTags);
router.get('/posts/period', validate('dateFormat', 'query'), postController.getPostsByPeriod);
router.patch('/post/:id', requireAuth, requirePostAuthor, validate('updatePost'), postController.updatePost);


export default router;