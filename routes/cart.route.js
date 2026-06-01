import { Router } from 'express';
import { authenticateKey } from '../middlewares/auth.middleware.js';
import { getCarts, addCart } from '../services/cart.service.js';

const router = Router();

//GET All carts
router.get('/', authenticateKey, async (req, res, next) => {
    const result = await getCarts();

    if (result.success) {
        res.json({
            success: true,
            carts: result,
        });
    } else {
        next({
            status: 404,
            message: result.message,
        });
    }
});

// PATCH cart
router.patch('/', async (req, res, next) => {
    const product = req.body;
    const user = global.user;
    if(!product) {
        next({
            status : 400,
            message : 'No request body provided'
        });
    }
    if(!user) {
        const result = await addCart({
            cartId : crypto.randomUUID().substring(0, 5),
            ...product
        });

        res.json({
            success: true,
            carts: result,
        });
    } else if (user) {
        const result = await addCart({
            cartId : user.userId,
            ...product
        });

        res.json({
            success: true,
            carts: result,
        });
    }
    
});

/*
router.patch('/', async (req, res, next) => {
        const {prodId, qty} = req.body;
        if(!product) {
        next({
            status : 400,
            message : 'No request body provided'
        });
    }
    })
*/

export default router;
