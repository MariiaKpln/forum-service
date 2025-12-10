import postService from "../services/post.service.js";

const requireAuth = (req, res, next) => {
    if (!req.principal || !req.principal.username) {
        return res.status(401).json({message: 'Unauthorized'})
    }
    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.principal.roles.includes('ADMIN')) {
        return res.status(403).json({message: 'Forbidden'})
        // return next({ status: 403, message: 'Forbidden' });
    }
    next();
};

const requireSelf = (req, res, next) => {
    if (req.principal.username !== req.params.user) {
        return res.status(403).json({message: 'Invalid credentials'})
    }
    next();
};

const requireSelfOrAdmin = (req, res, next) => {
    const principal = req.principal.username;
    const target = req.params.user;
    const isAdmin = req.principal.roles.includes('ADMIN');
    const isSelf = principal === target;

    if (!isAdmin && !isSelf) {
        return res.status(403).json({message: 'Invalid credentials'})
    }

    next();
};

const requirePostAuthor = async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        if (req.principal.username !== post.author) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.post = post;
        next();
    } catch (err) {
        next(err);
    }
};

// Post author or moderator
const requirePostAuthorOrModerator = async (req, res, next) => {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const isAuthor = req.principal.username === post.author;
        const isModerator = req.principal.roles.includes('MODERATOR');

        if (!isAuthor && !isModerator) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.post = post;
        next();
    } catch (err) {
        next(err);
    }
};


export { requireAuth, requireAdmin, requireSelf, requireSelfOrAdmin, requirePostAuthor, requirePostAuthorOrModerator };







