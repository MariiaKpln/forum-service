import postService from "../services/post.service.js";

class PostController {

    async createPost(req, res, next) {
        try {
            const post = await postService.createPost(req.params.user, req.body);
            return res.status(201).json(post);
        } catch (err) {
            next(err);
        }
    }

    async getPostById(req, res, next) {
        try {
            return res.json(req.post || await postService.getPostById(req.params.id));
        } catch (err) {
            next(err);
        }
    }

    async deletePost(req, res, next) {
        try {
            const post = await postService.deletePost(req.params.id);
            return res.json(post);
        } catch (err) {
            next(err);
        }
    }


    async updatePost(req, res, next) {
        try {
            const post = await postService.updatePost(req.params.id, req.body);
            return res.json(post);
        } catch (err) {
            next(err);
        }
    }


    async addLike(req, res, next) {
        try {
            await postService.addLike(req.params.id);
            return res.sendStatus(204);
        } catch (err) {
            next(err);
        }
    }


    async addComment(req, res, next) {
        try {
            const post = await postService.addComment(req.params.id, req.params.commenter, req.body.message);
            return res.json(post);
        } catch (err) {
            next(err);
        }
    }


    async getPostsByAuthor(req, res, next) {
        try {
            const posts = await postService.getPostsByAuthor(req.params.author);
            return res.json(posts);
        } catch (err) {
            next(err);
        }
    }


    async getPostsByTags(req, res, next) {
        try {
            const values = Array.isArray(req.query.values) ? req.query.values.join(',') : req.query.values;
            const posts = await postService.getPostsByTags(values);
            return res.json(posts);
        } catch (err) {
            next(err);
        }
    }


    async getPostsByPeriod(req, res, next) {
        try {
            const { dateFrom, dateTo } = req.query;
            const posts = await postService.getPostsByPeriod(dateFrom, dateTo);
            return res.json(posts);
        } catch (err) {
            next(err);
        }
    }
}

export default new PostController();
