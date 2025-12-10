import postService from "../services/post.service.js";
import req from "express/lib/request.js";
class Authorization {
    hasRole(role) {
        return (req, res, next) => req.principal.roles.includes(role.toUpperCase().trim()) ? next() : res.sendStatus(403).send('Access denied');
    }
    isOwner(paramName) {
        return (req, res, next) => req.params[paramName] === req.principal.username ? next() : res.sendStatus(403).send('Access denied');
    }
    isOwnerOrHasRole(paramName, role) {
        return (req, res, next) => {
            const isOwner = req.params[paramName] === req.principal.username;
            const hasRole = req.principal.roles.includes(role.toUpperCase().trim());
            return isOwner || hasRole ? next() : res.sendStatus(403).send('Access denied');
        }
    }
    isPostAuthor(postIdParam) {
        return async (req, res, next) => {
            const postId = req.params[postIdParam];
           const post = await postService.getPostById(postId);
           return post.author === req.principal.username ? next() : res.sendStatus(403).send('Access denied');
        }
    }
    isPostAuthorOrHasRole(postIdParam, role) {
        return async (req, res, next) => {
            const postId = req.params[postIdParam];
            const post = await postService.getPostById(postId);
            const isAuthor = post.author === req.principal.username;
            const hasRole = req.principal.roles.includes(role.toUpperCase().trim());
            return isAuthor || hasRole ? next() : res.sendStatus(403).send('Access denied');
        }
    }
}

export default new Authorization();







