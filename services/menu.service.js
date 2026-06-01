import Product from '../models/menu.model.js';

// Get menu
export const getMenu = async () => {
    try {
        const result = await Product.find();
        return {
            success: true,
            menu: result,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

// Get menu by ID
export const getMenuById = async (prodId) => {
    try {
        const result = await Product.findOne({prodId});
        return {
            success : true,
            product : result
        }
        
    } catch(error) {
        return {
            success : false,
            message : error.message
        }
    }
}