import { Router } from 'express';
import { authenticateKey, authorizeUser } from '../middlewares/auth.middleware.js';
import { getOrders, addOrder, getOrderByID } from '../services/orders.service.js';

const router = Router();

router.use(authenticateKey);

//GET All order
router.get('/', async (req, res, next) => {
    const result = await getOrders();

    if (result.success) {
        res.json({
            success: true,
            orders: result,
        });
    } else {
        next({
            status: 404,
            message: result.message,
        });
    }
});

//GET order by ID
router.get('/:userId', authorizeUser, async (req, res, next) => {
    const result = await getOrderByID(req.params);

    if (result.success) {
        res.json({
            success: true,
            orders: result,
        });
    } else {
        next({
            status: 404,
            message: result.message,
        });
    }
});

//POST add order
router.post('/', async (req, res, next) => {
    const cartId = req.body;
    const user = global.user;
    if(!cartId) {
        next({
            status : 400,
            message : 'No request body provided'
        });
    }

    const result = await addOrder({
        orderId : crypto.randomUUID().substring(0, 5),
        ...cartId
    });

    res.json({
        success: true,
        carts: result,
    });
    
});

export default router;