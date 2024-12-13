import Jsend from "../helpers/jsend.js";

const needLogin = function (...roles) {
    return function (req, res, next) {
        try {
            if (!req.user) {
                throw new Error("Login Needed.");
            }
            if (roles.length == 0) return next();
            if (!roles.includes(req.user.role)) {
                throw new Error("User with role '" + req.user.role + "' cannot access this route.");
            }
            return next();
        } catch (e) {
            return res.status(403).send( Jsend.fail(null, e.message) )
        }
        
    }
}

export default needLogin;