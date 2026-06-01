import { Router } from 'express';
import { authenticateKey } from '../middlewares/auth.middleware.js';
import { getMenu, getMenuById } from '../services/menu.service.js';

const router = Router();

// GET menu
router.get('/', authenticateKey, async (req, res, next) => {
    const result = await getMenu();

    if (result.success) {
        res.json({
            success: true,
            menu: result.menu,
        });
    } else {
        next({
            status: 404,
            message: result.message,
        });
    }
});

// GET menu by ID
router.get('/:prodId', authenticateKey, async (req, res, next) => {
    const {prodId} = req.params;
    const result = await getMenuById(prodId);

    if (result.success) {
        res.json({
            success: true,
            product: result.product,
        });
    } else {
        next({
            status: 404,
            message: result.message,
        });
    }
});

export default router;
