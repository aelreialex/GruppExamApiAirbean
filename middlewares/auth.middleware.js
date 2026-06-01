import { keyExists } from "../services/keys.service.js";

export const authenticateKey = async (req, res, next) => {
    const apiKey = req.headers['x-api-key'];
    if(!apiKey) {
        next({
            status : 401,
            message : 'No API key provided'
        });
    }

    const result = await keyExists(apiKey);

    if(!result.success) {
        next({
            status : 401,
            message : result.message
        });
    }
    next();
}

export const authorizeUser = (req, res, next) => {
    const user = global.user; 
    if(!user) {
        next({
            status : 401,
            message : 'User not logged in'
        });
    }
    next();
}