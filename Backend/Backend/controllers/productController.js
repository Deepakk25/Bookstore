const Product= require("../models/productModel")
const { v4: uuidv4 } = require('uuid');//retriving data ,if mongoose id->hack

exports.getProducts = async (req,res) =>{
    try{
        const products = await Product.find()
        res.send(products)
    }
    catch(err){
        console.error(err);
    }   
    // console.log(req.user);
    
}

exports.createProducts = async (req,res) =>{
    const {title,description,price,category,rating,image}= req.body;
    const product= new Product({
        id:uuidv4(),
        title,
        description,
        price,
        category,
        rating,
        image
    })
    await product.save()
    res.status(200).json("product created successfully")
}









