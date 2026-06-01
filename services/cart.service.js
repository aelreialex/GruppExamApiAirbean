import Cart from '../models/cart.model.js';
import Product from '../models/menu.model.js';

// GET carts
export const getCarts = async () => {
    try {
        const result = await Cart.find();
        return {
            success: true,
            cart: result,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

// PATCH cart
export const addCart = async (product) => {
    try {
            console.log(product);
            const cart = await Cart.findOne({cartId: product.cartId});
            const item = await Product.findOne({ prodId: product.prodId });
            console.log(item);

            if(cart) {
                // console.log("Updating cart...");
                // cart.items = item;
                // cart.items.qty = product.qty;
                // const updatedCart = await cart.save();
                const cartItem = cart.items.find(i => i.prodId === product.prodId);
                if(cartItem) {
                    cartItem.qty = product.qty;
                } else {
                    cart.items.push({
                        price: item.price,
                        title: item.title,
                        prodId: item.prodId,
                        qty : product.qty
                    });
                }
                const updatedCart = await cart.save();
                
                return {
                    success : true,
                    cart : updatedCart
                }

            } else if (!cart) {
                console.log("Creating cart...");
                const result = await Cart.create({
                    cartId : product.cartId, 
                    items : [{
                        ...item,
                        qty : product.qty
                    }]
                });

                return {
                    success : true,
                    cart : result
                }
            }
            // let newItem = {
            //     ...item,
            //     qty: qty
            // }
            // const result = await Cart.create({
            //     _id,
            //     ...newItem
            // });
            // return {
            //     success : true,
            //     cart : result
            // }
        } catch(error) {
            return {
                success : false,
                message : error.message
            }
    }
};