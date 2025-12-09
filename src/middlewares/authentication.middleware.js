import UserAccount from '../models/user.account.model.js';
const authentification = async (req, res, next) => {
    if(req.path !== '/account/register') {
        const authorization = req.headers.authorization;
        if(!authorization || !authorization.startsWith('Basic ')) {
            return  res.status(401).json({message: 'Authorization required'});

        }
        const token = authorization.split(' ')[1];
        const decodedToken = Buffer.from(token, 'base64').toString('ascii');
        const [login, password] = decodedToken.split(':');
        const userAccount = await UserAccount.findById(login);
        if(!userAccount || !(await userAccount.comparePassword(password))) {
            return res.status(403).json({message: 'Invalid credentials'})
        }

        req.headers.authorization = '';
        req.principal = {username: login, roles: userAccount.roles};
    }


   return next();
}

export default authentification;