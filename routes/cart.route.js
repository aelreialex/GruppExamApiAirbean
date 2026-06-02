import { Router } from 'express';
import { authenticateKey, authorizeUser } from '../middlewares/auth.middleware.js';
import { getCarts, addCart, getCartByID } from '../services/cart.service.js';

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

//GET cart by ID
router.get('/:cartId', authenticateKey, async (req, res, next) => {
    const result = await getCartByID(req.params);

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
router.patch('/', authenticateKey, async (req, res, next) => {
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

export default router;
