const Order = require('../models/orderModel');
const Cart = require("../models/cartModel");
const Products = require("../models/productModel");


// Create a new order
exports.createOrder = async (req, res) => {
    try {
        const { name, address, orderDate, deliveryDate, email } = req.body;

        // Validate input

        if (!name || !address || !orderDate || !deliveryDate || !email) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user_id = req.user.user_id;
        console.log(user_id);

        // Find user's cart
        let cart = await Cart.findOne({ user_id });

        if (!cart) {
            return res.status(404).json({ message: "Cart Not Found" });
        }

        let subTotal = 0;

        // Fetch product details and calculate subtotal
        const cartItems = await Promise.all(
            cart.products.map(async (product) => {
                const productDetails = await Products.findOne({ id: product.product_id });
                if (!productDetails) {
                    throw new Error(`Product with id ${product.product_id} not found`);
                }

                subTotal += productDetails.price * product.quantity;
                console.log(productDetails);
                console.log(subTotal);

                return {
                    product_id: productDetails.id,
                    title: productDetails.title,
                    description: productDetails.description,
                    price: productDetails.price,
                    image: productDetails.image,
                    quantity: product.quantity
                };
            })
        );
        console.log(cartItems);
        

        // Create a new order
        const order = new Order({
            name,
            address,
            products: cartItems,
            orderDate,
            deliveryDate,
            email,
         
        });

        await order.save();
        res.status(201).json({ message: "Order created successfully", order });

    } catch (err) {
        res.status(500).json({ message: "Error creating order", error: err.message });
    }
};


exports.getOrdersByEmail = async (req, res) => {
    try {
        const { email } = req.body; // Get email from the request body

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Find orders by email
        const orders = await Order.find({ email });

        if (orders.length === 0) {
            return res.status(404).json({ message: "No orders found for this email" });
        }

        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving orders", error: err.message });
    }
};


exports.deleteOrdersByEmail = async (req, res) => {
    try {
        const email = req.params.email; // Get email from URL parameters

        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }

        // Delete orders by email
        const result = await Order.deleteMany({ email });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No orders found to delete for this email" });
        }

        res.status(200).json({ message: `${result.deletedCount} orders deleted successfully` });
    } catch (err) {
        res.status(500).json({ message: "Error deleting orders", error: err.message });
    }
};