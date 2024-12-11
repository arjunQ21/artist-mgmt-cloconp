import { getUserFromJWT } from "../helpers/functions.js";

const captureUserFromJWT = async function (req, res, next) {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        req.user = await getUserFromJWT(token);
    } else {
        console.log('Authorization token missing or invalid');
    }
    next();
}

export default captureUserFromJWT;