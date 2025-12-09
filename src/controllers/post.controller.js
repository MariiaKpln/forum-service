import postService from "../services/post.service.js";

class PostController {
    async createPost(req, res, next) {
        try {
            const login = req.principal.username;
            const author = req.params.author
            const isSelf = login === author;
            if (!isSelf) {
                return next({message: 'Invalid credentials', statusCode: 403});
            }
                const post = await postService.createPost(req.params.author, req.body);
                return res.status(201).json(post);
        } catch (error) {
            return next(error);
        }
    }

    async getPostById(req, res, next) {
        try {
            const login = req.principal.username;
            if(login) {
                const post = await postService.getPostById(req.params.id);
                return res.json(post);
            }
        } catch (error) {
            return next(error);
        }
    }

    async deletePost(req, res, next) { //done
        try {
            const isModerator = req.principal.roles.includes('MODERATOR');
            const principalLogin = req.principal.username;
            const {author} = await postService.getPostById(req.params.id);
            const isSelf = principalLogin === author;
            if(!isModerator && !isSelf) {
                return next({message: 'Invalid credentials', statusCode: 403});
            }
                const post = await postService.deletePost(req.params.id);
                return res.json(post);

        } catch (error) {
            return next(error);
        }
    }

    async addLike(req, res, next) { //done
        try {
            const login = req.principal.username;
            if(login) {
                await postService.addLike(req.params.id);
                return res.sendStatus(204);
            }
        } catch (err) {
            return next(err);
        }
    }

    async getPostsByAuthor(req, res, next) { //done
        try {
            const posts = await postService.getPostsByAuthor(req.params.author);
            return res.json(posts);
        } catch (err) {
            return next(err);
        }
    }

    async addComment(req, res, next) {
        try {
            const login = req.principal.username;
            const commenter = req.params.commenter
            const isSelf = login === commenter;
            if (!isSelf) {
                return next({message: 'Invalid credentials', statusCode: 403});
            }
            const post = await postService.addComment(req.params.id, req.params.commenter, req.body.message);
            return res.json(post);
        } catch (err) {
            return next(err);
        }
    }

    async getPostsByTags(req, res, next) {
        let values;
        if (Array.isArray(req.query.values)) {
            values = req.query.values.reduce((acc, item) => acc + ',' + item);
        } else {
            values = req.query.values;
        }
        try {
            const posts = await postService.getPostsByTags(values);
            return res.json(posts);
        } catch (err) {
            return next(err);
        }
    }

    async getPostsByPeriod(req, res, next) {
        try {
            const {dateFrom, dateTo} = req.query;
            const posts = await postService.getPostsByPeriod(dateFrom, dateTo);
            return res.json(posts);
        } catch (err) {
            return next(err);
        }
    }

    async updatePost(req, res, next) {
        try {
            const login = req.principal.username;
            const {author} = await postService.getPostById(req.params.id);
            console.log(author);
           const isSelf = login === author;
            if (!isSelf) {
                return next({message: 'Invalid credentials', statusCode: 403});
            }
            const post = await postService.updatePost(req.params.id, req.body);
            return res.json(post);
        } catch (err) {
            return next(err);
        }
    }
}

export default new PostController()