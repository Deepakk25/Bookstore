const express=require("express")
const Cart=require("../models/cartModel")
const Products=require("../models/productModel")
const { v4: uuidv4 } = require('uuid');//retriving data ,if mongoose id->hack
const User=require("../models/userModel")

exports.createCart= async(req,res)=>{
    const user_id = req.user.user_id;
    console.log(user_id);
    const{product_id,quantity}=req.body;
    let cart = await Cart.findOne({user_id});

    if(!cart){
        cart=new Cart({
            user_id,
            products:[{
                product_id,
                quantity

            }]

        })


        // await newcart.save();
        // res.status(200).json({message:"Cart created successfully"})


    }else{
        const ProductIndex=cart.products.findIndex((prod)=>prod.product_id===product_id);

        if(ProductIndex > -1){
            cart.products[ProductIndex].quantity=quantity;
        }else{
                      
            cart.products.push({product_id,quantity});
        }
    }

    cart.save()
    res.status(201).json({message:"product Updated in the cart",cart });
}

exports.getCart=async(req,res)=>{
    const user_id = req.user.user_id;
    console.log(user_id);

    let cart = await Cart.findOne({user_id});

    if(!cart){
        return res.status(404).json({message:"Cart Not Found"})
    }
    try{
        let subTotal=0;

        console.log(cart.products);  
        
        
    const CartItems=await Promise.all(
        // product array->product :map
        cart.products.map(async (product)=>{
            const productDetails=await Products.findOne({id:product.product_id});
            subTotal += productDetails.price*product.quantity
            console.log(productDetails);
            console.log(subTotal);

            return{
                product_id:productDetails.id,
                title:productDetails.title,
                description:productDetails.description,
                price:productDetails.price,
                image:productDetails.image,
                quantity:product.quantity
            }
        })
    )
    res.status(200).json({cartItems:CartItems})
} catch(err){
    res.status(500).json({message:"Error",err})
};}

exports.removefromcart=async(req,res)=>{
    const user_id=req.user.user_id;
   
    // const {productId} = req.body;
    const productId = req.params.id
    console.log(req.params)
    // console.log(productId);
    
    const userCart=await Cart.findOne({user_id})
    // console.log(userId)
    if(!userCart){
        return res.status(404).json("cart not found")
    }else{
        const cartitems=userCart.products;
        if(!cartitems){
            res.status(200).json("No items in cart")
        }
        else{
            if(!cartitems.find((item)=>productId==item.product_id)){
                res.status(200).json("product not found in cart")
            }
            const updatedCartitems=cartitems.filter((product)=>productId!=product.product_id)
            userCart.products = updatedCartitems;
            await userCart.save();
            res.status(200).json("item removed from cart")
        }
    }
}




   

  
    



  




