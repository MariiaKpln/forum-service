const requireAuth = (req) => {
    if (!req.principal) {
        throw {status: 401, message: 'Unauthorized'};
    }
};


const requireSelfOrAdmin = (req) => {
    const principalLogin = req.principal?.username;
    const targetLogin = req.params.user;

    if (!principalLogin) {
        throw {status: 401, message: 'Unauthorized'};
    }

    const isAdmin = req.principal.roles.includes('ADMIN');
    const isSelf = principalLogin === targetLogin;

    if (!isAdmin && !isSelf) {
        throw {status: 403, message: 'Invalid credentials'};
    }
};


const requireSelf = (req) => {
    const principalLogin = req.principal.username;
    if (!principalLogin) {
        throw {status: 401, message: 'Unauthorized'};
    }
    const targetLogin = req.params.user;
    if (principalLogin !== targetLogin) {
        throw {status: 403, message: 'Invalid credentials'};
    }
};


export {requireAuth, requireSelfOrAdmin, requireSelf};





